import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '@hooks/useRedux';
import { onCreateUser, onUpdateUser } from '@redux/actions/accounts.action';
import { accountsService } from '@services/account.service';
import { useAsync } from '@hooks/useAsync';
import { foodsService } from '@services/foods.service';
import { onUpdateFood } from '@redux/actions/foods.action';
import { DeleteOutline, FileUpload } from '@mui/icons-material';

interface UpdateFoodModalOpen {
  id: number;
  open: boolean;
  onClose: any;
}

const foodFormSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc.'),
  price: z.string().min(1, 'Giá là bắt buộc.'),
  description: z.string().min(1, 'Mô tả là bắt buộc.'),
});

export const UpdateFoodModal = ({ open, onClose, id }: UpdateFoodModalOpen) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>();

  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof foodFormSchema>>({
    resolver: zodResolver(foodFormSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const response: any = await foodsService.getFood(id);
      setValue('name', response.food.name);
      setValue('price', response.food.price);
      setValue('description', response.food.description);
    };
    if (id !== 0) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, open]);

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
    setIsLoading(true);
    const dataValues = {
      name: data.name,
      price: data.price,
      description: data.description,
      image: selectedFile,
    };

    if (!!selectedFile) {
      setIsLoading(true);
      executeUpdate(dataValues);
    }
  });

  const [executeUpdate] = useAsync<{
    name: string;
    price: string;
    description: string;
    image: string;
  }>({
    delay: 500,
    asyncFunction: async payload => dispatch(onUpdateFood({ dataValues: payload, foodId: id })),
    onResolve: () => {
      setIsLoading(false);
      reset();
      onClose(false);
      enqueueSnackbar('Cập nhập thành công', {
        variant: 'success',
      });
    },
    onReject: (error: any) => {
      setIsLoading(false);
      enqueueSnackbar('Cập nhật thất bại', {
        variant: 'error',
      });
    },
  });

  return (
    <AppDialog title="Cập nhật đồ ăn" open={open} onClose={() => onClose(false)}>
      <form onSubmit={onSubmit} action="#">
        <Stack spacing={3}>
          <TextField
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            label=" Tên"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            {...register('price')}
            error={!!errors.price}
            helperText={errors.price?.message}
            label="Giá"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="number"
          />
          <TextField
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
            label="Mô tả"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
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
          <Box className="w-full flex justify-end gap-2">
            <Button variant="outlined" size="medium" onClick={() => onClose(false)}>
              Hủy
            </Button>
            <LoadingButton type="submit" variant="contained" size="medium" loading={isLoading}>
              Cập nhật
            </LoadingButton>
          </Box>
        </Stack>
      </form>
    </AppDialog>
  );
};
