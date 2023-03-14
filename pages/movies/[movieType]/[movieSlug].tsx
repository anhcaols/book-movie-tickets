/* eslint-disable @next/next/no-img-element */
import { NextPageWithLayout } from '../../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import { Box, Typography, Stack, Dialog, Divider, Rating, Grid, styled } from '@mui/material';
import { Star, AccessTimeOutlined, Close, ArrowForward } from '@mui/icons-material';
import Button from '@components/shared/Button/Button';
import { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Link from 'next/link';
import Comment from '@components/shared/Comment/Comment';
import MovieItem from '@components/shared/MovieItem/MovieItem';
import { useRouter } from 'next/router';
import { moviesService } from '@services/movies.service';
import { NEXT_APP_API_BASE_URL } from '@configs/app.config';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onGetMovies } from '@redux/actions/movies.action';

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
  const [movie, setMovie] = useState<MovieEntity>();

  const router = useRouter();
  const slug = router.query.movieSlug;
  const movieType = router.query.movieType;

  const lastMovie = movie?.genres[movie?.genres.length - 1];
  const genres = movie?.genres.map(genre => {
    let spread = genre === lastMovie ? ' ' : ', ';
    return genre + spread;
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res: any = await moviesService.getMovie({ slug: `${slug}` });
        if (res.success) {
          setMovie(res.movie);
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (slug !== undefined) {
      fetchMovie();
    }
  }, [slug]);

  const dispatch = useAppDispatch();
  const { nowShowing } = useAppSelector(state => state.movies);
  const nowShowingMovies = nowShowing.movies;

  useEffect(() => {
    dispatch(onGetMovies());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Box className="container flex flex-row flex-wrap content-center items-center mx-auto">
        <Box className="px-4 my-16 w-full">
          <Box className="flex flex-col md:flex-row" gap={4}>
            <img
              className="block rounded w-[250px] h-[386px] object-fill"
              src={`${NEXT_APP_API_BASE_URL}/static/${movie?.image}`}
              alt="img"
            />
            <Stack spacing={1} className="overflow-hidden">
              <Typography
                className="overflow-hidden whitespace-nowrap text-ellipsis uppercase"
                color="#fff"
                fontSize={26}
              >
                {movie?.name}
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
                <span className="px-1 bg-gradient-to-r from-[#ff55a5] to-[#ff5860] rounded-sm">C{movie?.age}</span>
                <AccessTimeOutlined fontSize="small" />
                <span className="text-text ml-[-10px]">{movie?.duration} phút</span>
              </Box>
              <Typography color="#fff">
                Thể loại: <span className="text-text"> {genres}</span>
              </Typography>
              <Typography color="#fff">
                Nhà sản xuất: <span className="text-text">{movie?.producer}</span>
              </Typography>
              <Typography color="#fff">
                Diễn viên: <span className="text-text">{movie?.actor}</span>
              </Typography>
              <Typography color="#fff">
                Quốc gia: <span className="text-text">{movie?.country}</span>
              </Typography>
              <Typography color="#fff">
                Đạo diễn: <span className="text-text">{movie?.director}</span>
              </Typography>
              <Typography color="#fff">
                Ngày khởi chiếu: <span className="text-text"> {moment(movie?.releaseDate).format('DD/MM/YYYY')}</span>
              </Typography>
              <Box display="flex" pt={1}>
                {movieType === 'now-showing' ? (
                  <Link href={`/book-ticket/${movie?.slug}`}>
                    <Button style={{ height: 40, marginRight: 16 }} primary small>
                      Mua vé
                    </Button>
                  </Link>
                ) : null}
                {movie?.trailer !== null ? (
                  <Button className="hover:border-primary" onClick={handleOpen} style={{ height: 40 }} outline>
                    Xem trailer
                  </Button>
                ) : null}
              </Box>
            </Stack>
          </Box>
          <Box pt={4}>
            <h2 className="text-2xl text-white leading-[100%] relative">
              Nội dung phim <p className="underline-title top-10"></p>
            </h2>
            <Box mt={4} fontSize={15}>
              <p>{movie?.description}</p>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box style={{ borderTop: '2px solid #ff55a5' }} pb={8}>
        <Box className="container flex flex-row flex-wrap content-center items-center mx-auto">
          <Box className="px-4 w-full">
            <Grid container spacing={2} pt={7}>
              <Grid item xs={12} md={9}>
                <Box>
                  <h2 className="text-2xl text-white leading-[100%] relative">
                    Xếp hạng và đánh giá phim <p className="underline-title top-10"></p>
                  </h2>
                  <Box mt={6}>
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
                            className="placeholder:text-[#ffffff80] bg-bgd outline-none p-4 text-white rounded resize-none min-h-[150px] w-full mt-2"
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
                      <Button className="mt-6 w-full " primary large>
                        Xem thêm
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <h2 className="text-2xl text-white leading-[100%] relative pl-4">
                    Phim đang chiếu<p className="underline-title top-10"></p>
                  </h2>
                  <Grid container>
                    {nowShowingMovies?.slice(0, 2).map(nowShowingMovie => (
                      <Grid item xs={6} sm={6} md={12} key={nowShowingMovie.id}>
                        <MovieItem movie={nowShowingMovie} state="now-showing" />
                      </Grid>
                    ))}
                  </Grid>
                  <Box display="flex" justifyContent="flex-end" mt={3}>
                    <Link href="/movies/now-showing">
                      <Button
                        outline
                        className="h-10 hover:border-primary flex"
                        icon={<ArrowForward fontSize="small" style={{ marginLeft: 8 }} />}
                      >
                        Xem thêm
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className=" relative">
          <Typography className="text-center text-lg py-3 capitalize ">{movie?.name}</Typography>
          <Divider />
          <Box p={2}>
            <YouTube videoId={movie?.trailer} opts={{ height: '420px', width: '100%' }} />
          </Box>
        </Box>
        <Close
          onClick={handleClose}
          className="absolute  right-5 top-3 text-[18px] cursor-pointer hover:text-primary"
        />
      </Dialog>
    </>
  );
};

MovieDetailPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default MovieDetailPage;
