import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { Box, Button, Grid, styled, Typography } from '@mui/material';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { Base64 } from 'js-base64';
import { useEffect, useState } from 'react';
import { onGetStatusSeats } from '@redux/actions/statusSeats.action';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import styles from './ChooseSeat.module.scss';
import moment from 'moment';
import { onSetInvoiceData } from '@redux/slices/invoiceData.slice';
import { useSnackbar } from 'notistack';
import getVietnameseDayOfWeek from '@utils/index';

const Seat = styled(Box)(() => ({
  cursor: 'default',
  borderRadius: 4,
  width: 30,
  height: 30,
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// style of seat
const styleSeatVip = {
  background: '#d4b15f',
  cursor: 'pointer',
};

const styleSeatAvailable = {
  background: '#dfdfdf',
  cursor: 'pointer',
};

const styleSeatBooked = {
  background:
    'repeating-linear-gradient(45deg,hsla(0,0%,60%,.4),hsla(0,0%,60%,.4) 10px,hsla(0,0%,60%,.6) 0,hsla(0,0%,60%,.6) 20px)',
  cursor: 'default',
};

const ChooseSeatPage: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [displaySeats, setDisplaySeats] = useState<
    {
      id: number;
      seatId: number;
      alphabetOfRow: string;
      price: number;
    }[]
  >([]);

  const slug = router.query.chooseSeat;

  const { invoiceData } = useAppSelector(state => state.invoiceData);

  useEffect(() => {
    dispatch(onGetStatusSeats({ query: { page: 1, limit: 200 }, payload: { schedule_id: invoiceData.schedule_id } }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  // handle when remove persist
  const [storageEventHandled, setStorageEventHandled] = useState(false);
  useEffect(() => {
    if (!storageEventHandled) {
      window.addEventListener('storage', event => {
        if (event.key === 'persist:root' && event.newValue === null) {
          router.push('/');
          enqueueSnackbar('Thao tác thất bại', {
            variant: 'error',
          });
        }
      });
      setStorageEventHandled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, storageEventHandled]);

  // get Seat by alphabets row
  const { statusSeats } = useAppSelector(state => state.statusSeats);
  let alphabets: {
    text: string;
    row: number;
  }[] = [];
  const totalRows = statusSeats[statusSeats.length - 1]?.rowPosition;
  function generateAlphabet() {
    if (alphabets.length !== 0) {
      return alphabets;
    }
    for (let i = 65; i <= 65 + totalRows; i++) {
      const char = String.fromCharCode(i);
      const row = i - 64;
      alphabets.push({ text: char, row: row });
    }
    return alphabets;
  }
  generateAlphabet();

  const totalAlphabetOfColumns = alphabets.slice(0, totalRows);
  let totalSeats = [];
  for (const seat of statusSeats) {
    console.log(seat);
    totalSeats.push({
      id: seat.id,
      seatId: seat.seatId,
      column: seat.columnPosition,
      status: seat.status,
      seatType: seat.seatType,
      rowPosition: seat.rowPosition,
      columnPosition: seat.columnPosition,
      price: seat.price,
    });
  }
  const newTotalSeats = [];
  const totalColumns = statusSeats[statusSeats.length - 1]?.columnPosition;
  for (let i = 0; i < totalSeats.length; i += totalColumns) {
    newTotalSeats.push(totalSeats.slice(i, i + totalColumns));
  }

  const handleChooseSeat = (
    id: number,
    seatId: number,
    statusSeat: string,
    price: number,
    row: number,
    column: number
  ) => {
    const filterRow = alphabets.filter(item => item.row === row);
    const alphabetOfRow = `${filterRow[0].text}${column}`;
    if (statusSeat === 'available') {
      const seatChecked = document.querySelector(`#seat-${id}`);
      if (seatChecked) {
        seatChecked.classList.toggle(styles.active);
      }

      let isCheckedActive = seatChecked?.classList;
      let hasRedClass = isCheckedActive?.contains(styles.active);
      if (hasRedClass) {
        setDisplaySeats(prev => [...prev, { id, seatId, alphabetOfRow, price }]);
      } else {
        const filteredArray = displaySeats.filter(item => item.alphabetOfRow !== alphabetOfRow);
        setDisplaySeats(filteredArray);
      }
    }
  };

  const date = moment(invoiceData?.showTime);
  const dayOfWeek = date.format('dddd');
  const vietnameseDayOfWeek = getVietnameseDayOfWeek(dayOfWeek);

  // custom render seat
  const lastSeat = displaySeats[displaySeats.length - 1]?.alphabetOfRow;
  const customDisplaySeats = displaySeats?.map(seat => {
    let spread = seat.alphabetOfRow === lastSeat ? ' ' : ', ';
    return seat.alphabetOfRow + spread;
  });

  // calc total amount
  let totalAmount = 0;
  displaySeats?.map(seat => {
    return (totalAmount += parseFloat(seat.price.toString()));
  });

  const handleContinue = () => {
    const seats = displaySeats?.map(seat => {
      return {
        id: seat.seatId,
        alphabetOfRow: seat.alphabetOfRow,
      };
    });
    if (seats.length === 0) {
      enqueueSnackbar('Vui lòng chọn ghế', {
        variant: 'warning',
      });
    } else {
      const data = { ...invoiceData, seats, totalAmount };
      dispatch(onSetInvoiceData(data));
      router.push(`/choose-food/${slug}`);
    }
  };

  return (
    <Box className="container flex flex-row flex-wrap content-center items-center mx-auto">
      <Box className="px-4 py-16" width="100%">
        <h2 className="text-2xl text-white leading-[100%] relative">
          Chọn ghế <p className="underline-title top-10"></p>
        </h2>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={8}>
            <Box>
              <Box py={2} display="flex" justifyContent="center" gap={3} flexWrap="wrap">
                <Box display="flex" alignItems="center" gap={1}>
                  <Seat
                    style={{
                      background:
                        'repeating-linear-gradient(45deg,hsla(0,0%,60%,.4),hsla(0,0%,60%,.4) 10px,hsla(0,0%,60%,.6) 0,hsla(0,0%,60%,.6) 20px)',
                      cursor: 'default',
                    }}
                  />
                  <Typography fontSize={14}>Đã bán</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Seat style={{ background: '#00b300' }} />
                  <Typography fontSize={14}>Ghế bạn chọn</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Seat style={{ background: '#dfdfdf' }} />
                  <Typography fontSize={14}>Ghế thường</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Seat style={{ background: '#d4b15f' }} />
                  <Typography fontSize={14}>Ghế vip</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width={30}
                    height={30}
                    sx={{ background: '#807878', borderRadius: 1 }}
                  >
                    <CloseIcon />
                  </Box>
                  <Typography fontSize={14}>Không thể chọn</Typography>
                </Box>
              </Box>
              <Box className="bg-[#807878] rounded py-1 text-center mt-4  font-medium">MÀN HÌNH</Box>
              <Box display="flex" mt={3} width="100%" gap={6}>
                <Box display="flex" flexDirection="column" gap={1}>
                  {totalAlphabetOfColumns.map(item => (
                    <Seat key={item.text} sx={{ background: '#727575', color: '#fff' }}>
                      {item.text}
                    </Seat>
                  ))}
                </Box>
                <Box display="flex" gap={1} flexWrap="wrap" justifyContent="flex-start" flex={1} height="100%">
                  {newTotalSeats.map((subArr, index) => (
                    <Box className="flex w-[100%] gap-2 justify-center" key={index}>
                      {subArr.map((seat, index) => {
                        let style;
                        if (seat.seatType === 'vip') {
                          style = styleSeatVip;
                        }
                        if (seat.seatType === 'normal') {
                          style = styleSeatAvailable;
                        }
                        if (seat.status === 'booked') {
                          style = styleSeatBooked;
                        }

                        return (
                          <Seat
                            style={style}
                            id={`seat-${seat.id}`}
                            onClick={() =>
                              handleChooseSeat(
                                seat.id,
                                seat.seatId,
                                seat.status,
                                seat.price,
                                seat.rowPosition,
                                seat.columnPosition
                              )
                            }
                            key={index}
                          >
                            {seat.column}
                          </Seat>
                        );
                      })}
                      <br />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="bg-[#ffffff0d] p-4 rounded-lg gap-1 flex flex-col">
              <p className="text-lg text-white capitalize font-semibold">{invoiceData?.movie?.name}</p>
              <Box mb={1}>
                <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">
                  C{invoiceData?.movie?.age}
                </span>
                <span className="text-xs mt-2 ml-2 text-primary opacity-[0.8] ">
                  Phim chỉ dành cho khán giả từ {invoiceData?.movie?.age} tuổi trở lên
                </span>
              </Box>
              <p className=" text-[15px] text-text ">
                Rạp: <span className="text-white capitalize font-semibold">{invoiceData?.cinema}</span>
              </p>
              <p className=" text-[15px] text-text ">
                Suất: <span className="font-semibold text-white">{moment(invoiceData?.showTime).format('HH:mm')}</span>{' '}
                -{' '}
                <span className="font-semibold text-white">
                  {vietnameseDayOfWeek}, {moment(invoiceData?.startTime).format('DD/MM/YYYY')}
                </span>
              </p>
              <p className=" text-[15px] text-text ">
                Phòng chiếu: <span className="font-semibold text-white">{invoiceData?.room}</span> - Ghế:{' '}
                <span className="font-semibold text-white">{customDisplaySeats.map(seat => seat)}</span>
              </p>
              <p className="text-base text-[15px] text-text mt-2 ">
                Tổng:{' '}
                <span className="font-semibold text-white text-base">
                  {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </span>
              </p>

              <Box className="flex gap-4 justify-between">
                <Link href={`/book-ticket/${slug}`} className="block w-full">
                  <Button variant="outlined" className="!mt-4  w-full">
                    Quay lại
                  </Button>
                </Link>
                <Button variant="contained" onClick={handleContinue} className="!mt-4 w-full">
                  Tiếp tục
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

ChooseSeatPage.getLayout = page => <MainLayout>{page}</MainLayout>;
const displaySeats = ['A1', 'A2'];
export default ChooseSeatPage;
