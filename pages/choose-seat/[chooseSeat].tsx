import { NextPageWithLayout } from '../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { Box, Grid, styled, Typography } from '@mui/material';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@components/shared/Button/Button';

const SeatSelected = styled(Box)(() => ({
  background:
    'repeating-linear-gradient(45deg,hsla(0,0%,60%,.4),hsla(0,0%,60%,.4) 10px,hsla(0,0%,60%,.6) 0,hsla(0,0%,60%,.6) 20px)',
  borderRadius: 4,
  width: 30,
  height: 30,
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SeatEmpty = styled(Box)(() => ({
  background: '#dfdfdf',
  borderRadius: 4,
  width: 30,
  height: 30,
  color: '#000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SeatChecked = styled(Box)(() => ({
  background: '#00b300',
  borderRadius: 4,
  width: 30,
  height: 30,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ChooseSeatPage: NextPageWithLayout = () => {
  return (
    <Box className="container flex flex-row flex-wrap content-center items-center mx-auto">
      <Box className="px-4 py-16" width="100%">
        <h2 className="text-2xl text-white leading-[100%] relative">
          Chọn ghế <p className="underline-title top-10"></p>
        </h2>

        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={8}>
            <Box>
              <Box py={2} display="flex" justifyContent="center" gap={4} flexWrap="wrap">
                <Box display="flex" alignItems="center" gap={1}>
                  <SeatSelected />
                  <Typography fontSize={14}>Đã bán</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SeatChecked />
                  <Typography fontSize={14}>Ghế bạn chọn</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SeatEmpty />
                  <Typography fontSize={14}>Ghế trống</Typography>
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
                  <SeatEmpty sx={{ background: '#727575', color: '#fff' }}>A</SeatEmpty>
                  <SeatEmpty sx={{ background: '#727575', color: '#fff' }}>B</SeatEmpty>
                  <SeatEmpty sx={{ background: '#727575', color: '#fff' }}>C</SeatEmpty>
                  <SeatEmpty sx={{ background: '#727575', color: '#fff' }}>D</SeatEmpty>
                  <SeatEmpty sx={{ background: '#727575', color: '#fff' }}>E</SeatEmpty>
                  <SeatEmpty sx={{ background: '#727575', color: '#fff' }}>F</SeatEmpty>
                </Box>
                <Box display="flex" gap={1} flexWrap="wrap" justifyContent="flex-start" flex={1} height="100%">
                  <SeatChecked>1</SeatChecked>
                  <SeatEmpty>1</SeatEmpty>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className="bg-[#ffffff0d] p-4 rounded-lg gap-1 flex flex-col">
              <Typography className="text-xl text-white capitalize font-semibold">Nhà bà nữ</Typography>
              <Box mb={1}>
                <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">C16</span>
                <span className="text-xs mt-2 ml-2 text-primary opacity-[0.8] ">
                  Phim chỉ dành cho khán giả từ 16 tuổi trở lên
                </span>
              </Box>
              <Typography className="text-[15px] text-text ">
                Rạp: <span className="text-white capitalize font-semibold">Cinema Nam Định</span>
              </Typography>
              <Typography className="text-[15px] text-text ">
                Suất: <span className="font-semibold text-white">11:20</span> -{' '}
                <span className="font-semibold text-white">Thứ tư, 22/02/2023</span>
              </Typography>
              <Typography className="text-[15px] text-text ">
                Phòng chiếu: <span className="font-semibold text-white">PC01</span> - Ghế:{' '}
                <span className="font-semibold text-white">A1, B1</span>
              </Typography>
              <Typography className="text-[15px] text-text mt-2 ">
                Tổng: <span className="font-semibold text-white">120.000 VND</span>
              </Typography>
              <Link href="/choose-food/slug">
                <Button className="mt-4 h-10 w-full" primary>
                  Tiếp tục
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

ChooseSeatPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default ChooseSeatPage;
