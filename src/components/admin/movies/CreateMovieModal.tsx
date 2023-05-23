import AppDialog from '@components/shared/app-dialog';
import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useAsync } from '@hooks/useAsync';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { onCreateMovie } from '@redux/actions/movies.action';
import dayjs from 'dayjs';
import { DeleteOutline, FileUpload } from '@mui/icons-material';
import { onGetGenres } from '@redux/actions/genres.action';

interface CreateMovieModalProps {
  open: boolean;
  onClose: any;
}

const movieFormSchema = z.object({
  name: z.string().min(1, 'Tên là bắt buộc'),
  duration: z.string().min(1, 'Thời lượng phim là bắt buộc'),
  releaseDate: z.any().refine(value => value !== null, {
    message: 'Ngày chiếu là bắt buộc',
  }),
  actor: z.string().min(1, 'Diễn viên khởi chiếu là bắt buộc'),
  director: z.string().min(1, 'Đạo diễn là bắt buộc'),
  country: z.string().min(1, 'Quốc gia là bắt buộc'),
  language: z.string().min(1, 'Ngôn ngữ là bắt buộc'),
  producer: z.string().min(1, 'Nhà sản xuất là bắt buộc'),
  status: z.any().refine(value => value !== '', {
    message: 'Trạng thái là bắt buộc',
  }),
  age: z.string().min(1, 'Độ tuổi là bắt buộc'),
  description: z.string().min(1, 'Tóm tắt là bắt buộc'),
  trailer: z.string().optional(),
});

export const CreateMovieModal = ({ open, onClose }: CreateMovieModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [genresSelected, setGenresSelected] = useState<{ id: number; name: string }[]>([]);
  const [status] = useState('');

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

  // get movie
  useEffect(() => {
    dispatch(onGetGenres({ query: { page: 1, limit: Infinity } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { genres } = useAppSelector(state => state.genres);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof movieFormSchema>>({
    resolver: zodResolver(movieFormSchema),
  });

  const onSubmit = handleSubmit(data => {
    const genresId = genresSelected.map(genre => genre.id);
    const dataValues = new FormData();
    dataValues.append('name', data.name);
    dataValues.append('duration', data.duration);
    dataValues.append('release_date', dayjs(data.releaseDate).format());
    dataValues.append('actor', data.actor);
    dataValues.append('director', data.director);
    dataValues.append('producer', data.producer);
    dataValues.append('country', data.country);
    dataValues.append('language', data.language);
    dataValues.append('age', data.age);
    dataValues.append('status', data.status);
    if (data.trailer) {
      dataValues.append('trailer', data.trailer);
    }
    dataValues.append('description', data.description);
    genresId.map(item => {
      dataValues.append('genre_id[]', item as any);
    });
    dataValues.append('image', selectedFile);

    console.log(dataValues);
    if (!!selectedFile && genresId.length > 0) {
      setIsLoading(true);
      executeCreate(dataValues);
    }
  });

  const [executeCreate] = useAsync({
    delay: 500,
    asyncFunction: async (payload: FormData) => dispatch(onCreateMovie(payload)),
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
    <AppDialog size="md" title="Thêm phim" open={open} onClose={() => onClose(false)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form onSubmit={onSubmit} action="#">
          <Stack spacing={3}>
            <Box display="flex" gap={1}>
              <TextField
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                label=" Tên phim"
                variant="outlined"
                fullWidth
              />
              <TextField
                {...register('duration')}
                error={!!errors.duration}
                helperText={errors.duration?.message}
                label=" Thời lượng (phút)"
                variant="outlined"
                fullWidth
                type="number"
              />
              <Controller
                name="releaseDate"
                defaultValue={null}
                control={control}
                render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                  <DesktopDatePicker
                    {...field}
                    inputFormat="DD/MM/YYYY"
                    inputRef={ref}
                    label="Thời gian khởi chiếu"
                    renderInput={inputProps => (
                      <TextField
                        fullWidth
                        {...inputProps}
                        onBlur={onBlur}
                        name={name}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                {...register('actor')}
                error={!!errors.actor}
                helperText={errors.actor?.message}
                label="Diễn viên"
                variant="outlined"
                fullWidth
              />
              <TextField
                {...register('director')}
                error={!!errors.director}
                helperText={errors.director?.message}
                label="Đạo diễn"
                variant="outlined"
                fullWidth
              />
              <TextField
                {...register('producer')}
                error={!!errors.producer}
                helperText={errors.producer?.message}
                label="Nhà sản xuất"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box display="flex" gap={1}>
              <TextField
                {...register('country')}
                error={!!errors.country}
                helperText={errors.country?.message}
                label="Quốc gia"
                variant="outlined"
                fullWidth
              />
              <TextField
                {...register('language')}
                error={!!errors.language}
                helperText={errors.language?.message}
                label="Ngôn ngữ"
                variant="outlined"
                fullWidth
              />
              <TextField
                {...register('age')}
                error={!!errors.age}
                helperText={errors.age?.message}
                label="Độ tuổi"
                variant="outlined"
                fullWidth
                type="number"
              />
            </Box>

            <Box display="flex" gap={1}>
              {/* <TextField
                {...register('status')}
                error={!!errors.status}
                helperText={errors.status?.message}
                label="Trạng thái"
                variant="outlined"
                fullWidth
              /> */}

              <FormControl fullWidth>
                <InputLabel id="select-gender" error={!!errors.status}>
                  Chọn trạng thái
                </InputLabel>
                <Controller
                  name="status"
                  defaultValue={status}
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="select-status"
                      {...field}
                      input={<OutlinedInput error={!!errors.status} label="Chọn trạng thái" />}
                    >
                      <MenuItem value={0}>Sắp chiếu</MenuItem>
                      <MenuItem value={1}>Đang chiếu</MenuItem>
                    </Select>
                  )}
                />
                <FormHelperText error={!!errors.status}>
                  {errors.status ? String(errors.status.message) : ''}
                </FormHelperText>
              </FormControl>

              <TextField
                {...register('trailer')}
                error={!!errors.trailer}
                helperText={errors.trailer?.message}
                label="Trailer"
                variant="outlined"
                fullWidth
              />
              <Box>
                {!selectedFile && (
                  <Box>
                    <Button className="!h-[56px] w-[280px]" size="large" variant="outlined" component="label">
                      <FileUpload className="mr-8" /> Tải ảnh (bắt buộc)
                      <input id="upload-photo" name="upload-photo" type="file" onChange={handleOnChangeFile} hidden />
                    </Button>
                  </Box>
                )}
                {!!selectedFile && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>{selectedFile.name}</Typography>
                    <Typography>
                      <DeleteOutline sx={{ cursor: 'pointer' }} onClick={handleClearFile} />
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            <Box display="flex" gap={1}>
              <Autocomplete
                className="flex-1"
                sx={{ width: 278 }}
                multiple
                limitTags={3}
                id="multiple-limit-tags"
                onChange={(event, newValue) => {
                  setGenresSelected([...newValue]);
                }}
                options={genres as any}
                getOptionLabel={option => `${option.name}`}
                renderTags={(value: any[], getTagProps: (arg0: { index: any }) => JSX.IntrinsicAttributes) =>
                  value.map((option: any, index: any) => {
                    return <Chip key={index} variant="outlined" label={option.name} {...getTagProps({ index })} />;
                  })
                }
                renderInput={params => <TextField {...params} label="Chọn thể loại" />}
              />
            </Box>

            <TextField
              rows={4}
              multiline
              {...register('description')}
              error={!!errors.description}
              helperText={errors.description?.message}
              label="Tóm tắt"
              variant="outlined"
              fullWidth
            />

            <Box className="flex justify-end ">
              <LoadingButton type="submit" variant="contained" size="large" loading={isLoading}>
                Thêm
              </LoadingButton>
            </Box>
          </Stack>
        </form>
      </LocalizationProvider>
    </AppDialog>
  );
};
