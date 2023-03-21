import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { Autocomplete, Box, Button, Card, Divider, Grid, styled, TextField, Tooltip, Typography } from '@mui/material';
import { AccessTimeOutlined } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import Link from 'next/link';

const StyledCinema = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
}));

const StyledTime = styled(Button)(({ theme }) => ({
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#fff',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyItems: 'center',
  borderRadius: theme.spacing(1),
  '&:hover': {
    borderColor: '#ff55a5 ',
    color: '#ff55a5 ',
    background: 'transparent',
  },
}));

const BookTicketPage: NextPageWithLayout = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  const active = {
    cursor: 'pointer',
  };
  const disabled = {
    cursor: 'default',
    opacity: 0.6,
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className=" bg-[#28282d] flex flex-col items-center py-6">
        <Typography fontSize={30} className=" text-white capitalize">
          Nhà bà nữ
        </Typography>
        <Typography>Hài</Typography>
        <Box display="flex" alignItems="center" gap={2} pt={1}>
          <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">C16</span>
          <AccessTimeOutlined fontSize="small" />
          <span className="text-text ml-[-10px]">120 phút</span>
        </Box>
      </Box>
      <Divider />
      <Box className="container flex flex-row flex-wrap content-center items-center mx-auto">
        <Box className="px-4 py-16 w-full">
          <h2 className="text-2xl text-white leading-[100%] relative">
            Mua vé trực tuyến <p className="underline-title top-10"></p>
          </h2>
          <Box mt={6} width="100%">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  options={cities}
                  renderInput={params => <TextField {...params} label="Thành phố" />}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name=""
                  control={control}
                  render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                    <DesktopDatePicker
                      {...field}
                      inputRef={ref}
                      label="Ngày"
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
              </Grid>
              <Grid item xs={12} md={4}>
                <Autocomplete
                  fullWidth
                  disablePortal
                  options={cinemas}
                  renderInput={params => <TextField {...params} label="Rạp" />}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} pt={6}>
              <Grid item xs={12} md={6}>
                <Box>
                  <StyledCinema p={2}>
                    <Box>
                      <Typography className="text-md text-white">Cinema Nam Định</Typography>
                      <Typography className="text-md text-white text-xs text-text">
                        Hồng Thuận, Giao Thủy, Nam Định
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography className="text-md text-white pb-2">2D Phụ đề</Typography>
                      <Box display="flex" flexWrap="wrap" gap={2}>
                        <Link href="/choose-seat/slug">
                          <StyledTime variant="outlined">11:20</StyledTime>
                        </Link>
                        <Link href="/">
                          <StyledTime variant="outlined">11:20</StyledTime>
                        </Link>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                      </Box>
                    </Box>
                  </StyledCinema>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <StyledCinema p={2}>
                    <Box>
                      <Typography className="text-md text-white">Cinema Nam Định</Typography>
                      <Typography className="text-md text-white text-xs text-text">
                        Hồng Thuận, Giao Thủy, Nam Định
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography className="text-md text-white pb-2">2D Phụ đề</Typography>
                      <Box display="flex" flexWrap="wrap" gap={2}>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                      </Box>
                    </Box>
                  </StyledCinema>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <StyledCinema p={2}>
                    <Box>
                      <Typography className="text-md text-white">Cinema Nam Định</Typography>
                      <Typography className="text-md text-white text-xs text-text">
                        Hồng Thuận, Giao Thủy, Nam Định
                      </Typography>
                    </Box>
                    <Box mt={1}>
                      <Typography className="text-md text-white pb-2">2D Phụ đề</Typography>
                      <Box display="flex" flexWrap="wrap" gap={2}>
                        <StyledTime disabled variant="outlined">
                          11:20
                        </StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                        <StyledTime variant="outlined">11:20</StyledTime>
                      </Box>
                    </Box>
                  </StyledCinema>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

BookTicketPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default BookTicketPage;

const cities = ['Hà Nội', 'Nam Định', 'Hồ Chí Minh'];
const cinemas = ['Cinema 1', 'Cinema 2', 'Cinema 3'];
