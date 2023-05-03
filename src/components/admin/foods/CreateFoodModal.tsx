import AppDialog from '@components/shared/app-dialog';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@hooks/useRedux';
import { useAsync } from '@hooks/useAsync';
import { DeleteOutline, FileUpload } from '@mui/icons-material';
import { onCreateFood } from '@redux/actions/foods.action';

interface CreateFoodModalOpen {
  open: boolean;
  onClose: any;
}

const foodFormSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc.'),
  price: z.string().min(1, 'Giá là bắt buộc.'),
  description: z.string().min(1, 'Mô tả là bắt buộc.'),
});

export const CreateFoodModal = ({ open, onClose }: CreateFoodModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [gender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const dispatch = useAppDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof foodFormSchema>>({
    resolver: zodResolver(foodFormSchema),
  });

  const handleOnChangeFile = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader.readAsDataURL(file);
    }
    await new Promise(_ => setTimeout(_, 500));
    if (file !== null) {
      setSelectedFile(file);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const onSubmit = handleSubmit(data => {
    const dataValues = new FormData();
    dataValues.append('name', data.name);
    dataValues.append('price', data.price);
    dataValues.append('description', data.description);
    dataValues.append('image', selectedFile);
    if (!!selectedFile) {
      setIsLoading(true);
      executeCreate(dataValues);
    }
  });

  const [executeCreate] = useAsync({
    delay: 500,
    asyncFunction: async (payload: FormData) => dispatch(onCreateFood(payload)),
    onResolve: () => {
      setIsLoading(false);
      reset();
      onClose(false);
      enqueueSnackbar('Thêm thành công', {
        variant: 'success',
      });
    },
    onReject: (error: any) => {
      setIsLoading(false);
      enqueueSnackbar('Thêm thất bại', {
        variant: 'error',
      });
    },
  });

  return (
    <AppDialog title="Thêm đồ ăn" open={open} onClose={() => onClose(false)}>
      <form onSubmit={onSubmit} action="#">
        <Stack spacing={3}>
          <TextField
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            label=" Tên"
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
            label="Giá"
            variant="outlined"
            fullWidth
            type="number"
          />
          <TextField
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            type="description"
            label="Mô tả"
            variant="outlined"
            fullWidth
          />
          {!selectedFile && (
            <>
              <Button variant="outlined" component="label">
                <FileUpload className="mr-8" /> Tải ảnh (bắt buộc)
                <input id="upload-photo" name="upload-photo" type="file" onChange={handleOnChangeFile} hidden />
              </Button>
            </>
          )}
          {!!selectedFile && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{selectedFile.name}</Typography>
              <Typography>
                <DeleteOutline sx={{ cursor: 'pointer' }} onClick={handleClearFile} />
              </Typography>
            </Box>
          )}

          <Box>
            <LoadingButton type="submit" className="w-full" variant="contained" size="large" loading={isLoading}>
              Thêm
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </AppDialog>
  );
};
