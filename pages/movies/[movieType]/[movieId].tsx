/* eslint-disable @next/next/no-img-element */
import { NextPageWithLayout } from '../../_app';
import MainLayout from '@layouts/MainLayout';
import { Box, Typography, Stack, Dialog, Divider, Rating, Grid, styled } from '@mui/material';
import { Star, AccessTimeOutlined, Close } from '@mui/icons-material';
import Button from '@components/shared/Button/Button';
import { useState } from 'react';
import YouTube from 'react-youtube';
import Link from 'next/link';
import Comment from '@components/shared/Comment/Comment';

const StyledRating = styled(Rating)(() => ({
  '& .css-1c99szj-MuiRating-icon': {
    color: '#fff',
  },
}));

const MovieDetailPage: NextPageWithLayout = () => {
  const [stars, setStars] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="container flex flex-row flex-wrap content-center items-center mx-auto">
        <Box className="px-4 my-16 w-full">
          <Box>
            <Box display="flex" gap={4}>
              <img
                className="block rounded w-[250px] h-[386px] object-fill"
                src="/assets/images/nhabanu.jpg"
                alt="img"
              />
              <Stack spacing={1} className="overflow-hidden">
                <Typography
                  className="overflow-hidden whitespace-nowrap text-ellipsis uppercase"
                  color="#fff"
                  fontSize={26}
                >
                  NHÀ BÀ NỮ
                </Typography>
                <Box display="flex" alignItems="center">
                  <Typography color="#fff" fontSize={18}>
                    Đánh giá:
                  </Typography>
                  <Star fontSize="small" style={{ color: '#ffc028', marginLeft: 10 }} />
                  <Typography color="#fff" fontSize={18}>
                    8.2<span className="text-text mr-2">/10</span>
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={2} pt={1}>
                  <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">C16</span>
                  <AccessTimeOutlined fontSize="small" />
                  <span className="text-text ml-[-10px]">120 phút</span>
                </Box>
                <Typography color="#fff">
                  Thể loại: <span className="text-text">Hài</span>
                </Typography>
                <Typography color="#fff">
                  Nhà sản xuất: <span className="text-text">CJ HK Entertainment</span>
                </Typography>
                <Typography color="#fff">
                  Diễn viên:{' '}
                  <span className="text-text">Lê Giang, Trấn Thành, Song Luân, Khả Như, Lê Dương Bảo Lâm</span>
                </Typography>
                <Typography color="#fff">
                  Quốc gia: <span className="text-text">Việt Nam</span>
                </Typography>
                <Typography color="#fff">
                  Đạo diễn: <span className="text-text">Trấn Thành</span>
                </Typography>
                <Typography color="#fff">
                  Ngày khởi chiếu: <span className="text-text">20/1/2023</span>
                </Typography>
                <Box display="flex" pt={1}>
                  <Link href="/book-tickets/slug">
                    <Button style={{ height: 40, marginRight: 16 }} primary small>
                      Mua vé
                    </Button>
                  </Link>
                  <Button onClick={handleOpen} style={{ height: 40 }} outline>
                    Xem trailer
                  </Button>
                </Box>
              </Stack>
            </Box>
            <Box pt={4}>
              <h2 className="text-2xl text-[#fff] leading-[100%] relative">
                Nội dung phim <p className="underline-title top-10"></p>
              </h2>
              <Box mt={4} fontSize={15}>
                <p>
                  Gia đình chữ “N” mỗi người một cá tính, một sở thích riêng nhưng tất cả đều phải chung tay vào công
                  việc bận rộn của quán bánh canh cua nức tiếng của bà Nữ. Hình ảnh các thành viên gia đình bà Nữ đều
                  rất gần gũi với hình mẫu người phụ nữ trong đời sống thường ngày: bản lĩnh, giỏi giang và thừa sức
                  xoay trở với hằng hà sa số những thử thách trong cuộc sống.
                </p>
                <p>
                  Nhà Bà Nữ tái hiện chân thực cuộc sống thường nhật của một gia đình lao động điển hình, sống bằng nghề
                  bán bánh canh cua. Nhà Bà Nữ do Kim Entertainment sản xuất, Trấn Thành đạo diễn. Bộ phim hội tụ những
                  tên tuổi diễn viên thân quen với khán giả Việt như: Trấn Thành, Lê Giang, NSND Ngọc Giàu, Khả Như,
                  Huỳnh Uyển Ân, Song Luân, Lê Dương Bảo Lâm, NSND Việt Anh, NSƯT Công Ninh, Ngân Quỳnh, Lý Hạo Mạnh
                  Quỳnh, Phương Lan…
                </p>
              </Box>
            </Box>
            <Box pt={8}>
              <h2 className="text-2xl text-[#fff] leading-[100%] relative">
                Xếp hạng và đánh giá phim <p className="underline-title top-10"></p>
              </h2>
              <Box mt={6}>
                <Grid container>
                  <Grid item md={8}>
                    <Box className=" my-3 p-5 bg-[#28282d] rounded-lg">
                      <Box display="flex" flexDirection="column">
                        <StyledRating
                          name="customized-10"
                          defaultValue={0}
                          max={10}
                          value={stars}
                          onChange={(event, stars: any) => setStars(stars)}
                        />
                        <Box width="100%" className="my-6">
                          <Typography color="#fff">Review của bạn (có thể để trống)</Typography>
                          <textarea
                            className="placeholder:text-[#ffffff80] bg-bgd outline-none p-4 text-[#fff] rounded resize-none min-h-[150px] w-full mt-2"
                            placeholder="Đánh giá của bạn về bộ phim Nhà Bà Nữ"
                          />
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                          <Button primary small>
                            Gửi
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                    <Box pt={2}>
                      <Comment />
                      <Comment />
                      <Comment />
                      <Comment />
                      <Comment />
                      <Comment />
                      <Comment />
                      <Comment />
                      <Comment />
                      <Comment />
                    </Box>
                    <Box display="flex" justifyContent="center">
                      <Button className="mt-6 w-full" primary large>
                        Xem thêm
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className="bg-[#ffffffbf] relative">
          <Typography className="text-center text-lg py-3 capitalize">nhà bà nữ</Typography>
          <Divider />
          <Box p={2}>
            <YouTube videoId={'pg4L29p98Kw'} opts={{ height: '420px', width: '100%' }} />
          </Box>
        </Box>
        <Close onClick={handleClose} className="absolute right-5 top-3 text-[18px] cursor-pointer hover:text-primary" />
      </Dialog>
    </>
  );
};

MovieDetailPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default MovieDetailPage;
