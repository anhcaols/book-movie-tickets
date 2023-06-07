import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { AccessTimeOutlined } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { moviesService } from '@services/movies.service';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onFilterSchedules, onGetSchedulesByMovie } from '@redux/actions/schedules.action';
import moment from 'moment';
import dayjs from 'dayjs';
import { onClearSchedules } from '@redux/slices/schedules.slice';
import { Base64 } from 'js-base64';
import { onClearInvoiceData, onSetInvoiceData } from '@redux/slices/invoiceData.slice';

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
  borderRadius: 8,
  '&:hover': {
    borderColor: '#ff55a5 ',
    color: '#ff55a5 ',
    background: 'transparent',
  },
}));

const BookTicketPage: NextPageWithLayout = () => {
  const [movie, setMovie] = useState<MovieEntity>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { control } = useForm();
  const [dateTime, setDateTime] = useState(moment().format('MM/DD/YYYY'));

  const slug = router.query.bookTicket;
  const lastGenre: any = movie?.genres[movie?.genres.length - 1];
  const genres = movie?.genres.map(genre => {
    let spread = genre.name === lastGenre.name ? ' ' : ', ';
    return genre.name + spread;
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const disabledDates = [{ before: new Date() }];

  useEffect(() => {
    dispatch(onClearSchedules());
    const fetchMovie = async () => {
      const res: any = await moviesService.getMovie(`${slug}`);
      setMovie(res.movie);
      if (res.movie) {
        dispatch(
          onGetSchedulesByMovie({
            payload: {
              movie_id: res.movie.id,
              date_time: dayjs(dateTime).format('YYYY-MM-DD'),
            },
          })
        );
      }
    };
    if (slug) {
      fetchMovie();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, dateTime]);

  useEffect(() => {
    dispatch(onClearSchedules());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTime]);

  const { schedulesByMovie, filterSchedulesByMovie } = useAppSelector(state => state.schedules);
  const { isLoggedIn, account } = useAppSelector(state => state.auth);

  // get cities
  let cities: string[] = [];
  const cinemaAddress = schedulesByMovie.map(schedule => schedule.room.cinemaAddress);
  cinemaAddress.map(city => {
    const newCity = city.split(',');
    cities.push(newCity[newCity.length - 1].replace('TP', '').trim());
  });
  let uniqueCities: string[] = Array.from(new Set(cities));

  // get cinemas
  const cinemas = schedulesByMovie.map(schedule => {
    return {
      cinemaName: schedule.room.cinemaName,
      cinemaAddress: schedule.room.cinemaAddress,
    };
  });

  const [currentCity, setCurrentCity] = useState('');
  const [currentCinemas, setCurrentCinemas] = useState<
    {
      cinemaName: string;
      cinemaAddress: string;
    }[]
  >([]);
  const [currentCinema, setCurrentCinema] = useState('');

  useEffect(
    function getCinemaByCity() {
      const result: {
        cinemaName: string;
        cinemaAddress: string;
      }[] = cinemas.filter(cinema => cinema.cinemaAddress.includes(currentCity));
      const uniqueCinemas = result.filter(
        (item, index, self) =>
          index === self.findIndex(t => t.cinemaName === item.cinemaName && t.cinemaAddress === item.cinemaAddress)
      );
      setCurrentCinemas(uniqueCinemas);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCity]
  );

  useEffect(
    () => {
      if (movie && currentCinema !== '' && currentCity !== '') {
        dispatch(
          onFilterSchedules({
            payload: {
              movie_id: movie.id,
              date_time: dayjs(dateTime).format('YYYY-MM-DD'),
              cinema_name: currentCinema,
              city: currentCity,
            },
          })
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentCinema, currentCity, movie]
  );

  const handleChooseSchedule = (scheduleId: number, showTime: string | Date, room: string, cinema: string) => {
    if (isLoggedIn === false) {
      router.push('/auth/login');
    } else {
      const data = {
        schedule_id: scheduleId,
        user_id: account.id,
        showTime,
        room,
        cinema,
        movie: {
          id: movie?.id,
          name: movie?.name,
          age: movie?.age,
        },
      };
      router.push({
        pathname: `/choose-seat/${slug}`,
      });

      dispatch(onSetInvoiceData(data));

      // setTimeout(() => {
      //   dispatch(onClearInvoiceData());
      //   router.push({
      //     pathname: `/`,
      //   });
      //   console.log('fail');
      // }, 20000);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className=" bg-[#28282d] flex flex-col items-center py-6">
        <Typography fontSize={30} className=" text-white capitalize">
          {movie?.name}
        </Typography>
        <Typography>{genres}</Typography>
        <Box display="flex" alignItems="center" gap={2} pt={1}>
          <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">C{movie?.age}</span>
          <AccessTimeOutlined fontSize="small" />
          <span className="text-text ml-[-10px]">{movie?.duration} phút</span>
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
                <FormControl fullWidth>
                  <InputLabel>Thành phố</InputLabel>
                  <Select
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={currentCity}
                    onChange={(event: SelectChangeEvent) => {
                      setCurrentCity(event.target.value);
                    }}
                    label="Thành phố"
                  >
                    {uniqueCities.length > 0 ? (
                      uniqueCities.map((uniqueCity, index) => (
                        <MenuItem key={index} value={uniqueCity}>
                          {uniqueCity}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={''}>Không có lựa chọn</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Rạp</InputLabel>
                  <Select
                    MenuProps={{
                      disableScrollLock: true,
                    }}
                    value={currentCinema}
                    onChange={(event: SelectChangeEvent) => {
                      setCurrentCinema(event.target.value);
                    }}
                    label="Rạp"
                  >
                    {currentCinemas.length > 0 ? (
                      currentCinemas?.map((uniqueCinema, index) => (
                        <MenuItem key={index} value={uniqueCinema.cinemaName}>
                          {uniqueCinema.cinemaName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value={''}>Không có lựa chọn</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { ref, onBlur, name, ...field }, fieldState }) => (
                    <DesktopDatePicker
                      shouldDisableDate={current => {
                        return current && current < dayjs().startOf('day');
                      }}
                      {...field}
                      inputFormat="DD/MM/YYYY"
                      inputRef={ref}
                      label="Ngày"
                      renderInput={inputProps => (
                        <TextField
                          value={dateTime}
                          fullWidth
                          {...inputProps}
                          onBlur={onBlur}
                          name={name}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                        />
                      )}
                      value={dateTime}
                      onChange={(dateTime: any) => {
                        setDateTime(dateTime);
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} pt={6}>
              {filterSchedulesByMovie.length > 0 ? (
                filterSchedulesByMovie.map((schedule, index) => (
                  <Grid key={index} item xs={12} md={6}>
                    <Box>
                      <StyledCinema p={2}>
                        <Box>
                          <Typography className="text-md text-white cursor-default">
                            {schedule.room.cinemaName} - {schedule.room.roomName}
                          </Typography>
                          <Typography className="text-md text-white text-xs text-text">
                            {schedule.room.cinemaAddress}
                          </Typography>
                        </Box>
                        <Box mt={1}>
                          <Typography className="text-md text-white pb-2">2D Phụ đề</Typography>
                          <Box display="flex" flexWrap="wrap" gap={2}>
                            {schedule.showTimes.map(showTime => (
                              <StyledTime
                                onClick={() =>
                                  handleChooseSchedule(
                                    showTime.id,
                                    showTime.startTime,
                                    schedule.room.roomName,
                                    schedule.room.cinemaName
                                  )
                                }
                                key={showTime.id}
                                variant="outlined"
                              >
                                {moment(showTime.startTime).format('HH:mm')}
                              </StyledTime>
                            ))}
                          </Box>
                        </Box>
                      </StyledCinema>
                    </Box>
                  </Grid>
                ))
              ) : (
                <Box className="flex justify-center w-[100%] mt-4 italic text-text">
                  <Typography>Hãy chọn địa điểm bạn muốn xem</Typography>
                </Box>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

BookTicketPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default BookTicketPage;
