/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { NextPageWithLayout } from '../../_app';
import MainLayout from '@layouts/MainLayout/MainLayout';
import {
  Box,
  Typography,
  Stack,
  Dialog,
  Divider,
  Rating,
  Grid,
  styled,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Star, AccessTimeOutlined, Close, ArrowForward } from '@mui/icons-material';
import Button from '@components/shared/Button';
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
import { ratingsService } from '@services/ratings.service';
import { useAsync } from '@hooks/useAsync';
import { useSnackbar } from 'notistack';
import { onGetRatings } from '@redux/actions/ratings.action';
import { onClearRatings } from '@redux/slices/ratings.slice';

const StyledRating = styled(Rating)(() => ({
  '& .css-1c99szj-MuiRating-icon': {
    color: '#fff',
  },
}));

const MovieDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [stars, setStars] = useState<number>(0);
  const [isOpenTrailer, setIsOpenTrailer] = useState<boolean>(false);
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isCheckStar, setIsCheckStar] = useState<boolean>(false);
  const [content, setContent] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movie, setMovie] = useState<MovieEntity>();

  const dispatch = useAppDispatch();
  const account = useAppSelector(state => state.auth);
  const { ratings, ratingsPagination } = useAppSelector(state => state.ratings);

  const slug = router.query.movieSlug;
  const movieType = router.query.movieType;

  const lastGenre = movie?.genres[movie?.genres.length - 1];
  const genres = movie?.genres.map(genre => {
    let spread = genre === lastGenre ? ' ' : ', ';
    return genre + spread;
  });

  useEffect(() => {
    dispatch(onClearRatings());
    const fetchMovie = async () => {
      const res: any = await moviesService.getMovie(`${slug}`);
      setMovie(res.movie);
    };
    fetchMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    const { query, movieId } = {
      query: {
        page: currentPage,
        limit: 10,
      },
      movieId: movie?.id,
    };

    if (movieId !== undefined) {
      dispatch(onGetRatings({ query, movieId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie?.id, currentPage]);

  useEffect(() => {
    setIsCheckStar(false);
  }, [stars]);

  const handleSendRating = () => {
    if (account?.isLoggedIn === false) {
      setIsOpenLogin(true);
      return;
    }
    if (stars === 0) {
      setIsCheckStar(true);
      return;
    }
    executeRating({
      user_id: account?.account.id,
      movie_id: Number(movie?.id),
      rate: stars,
      content,
    });
    setContent('');
    setStars(0);
  };

  const [executeRating] = useAsync<{
    user_id: number;
    movie_id: number;
    rate: number;
    content: string | undefined;
  }>({
    delay: 500,
    asyncFunction: async payload => ratingsService.createRating(payload),
    onResolve: () => {
      enqueueSnackbar('Đánh giá bộ phim thành công', {
        variant: 'success',
      });
    },
    onReject: (error: any) => {
      if (!error.response.data.success) {
        enqueueSnackbar('Bạn đã đánh giá bộ phim này', {
          variant: 'warning',
        });
      }
    },
  });

  return (
    <>
      <Box className="container flex flex-row flex-wrap content-center items-center mx-auto">
        <Box className="px-4 my-16 w-full">
          <Box className="flex flex-col md:flex-row" gap={4}>
            <img
              className="block rounded w-[250px] h-[386px] object-fill"
              src={movie?.image !== undefined ? ` ${NEXT_APP_API_BASE_URL}/static/${movie?.image}` : ''}
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
                {movie?.scoreRate !== null ? (
                  <>
                    <Typography color="#fff" fontSize={18}>
                      Đánh giá:
                    </Typography>
                    <Star fontSize="small" style={{ color: '#ffc028', marginLeft: 10 }} />
                    <Typography color="#fff" fontSize={18}>
                      {movie?.scoreRate}
                      <span className="text-text mr-2">/10</span>
                    </Typography>
                  </>
                ) : null}
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
                  <Button
                    className="hover:border-primary"
                    onClick={() => setIsOpenTrailer(true)}
                    style={{ height: 40 }}
                    outline
                  >
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
            <Grid container spacing={3} pt={7}>
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
                        {isCheckStar && <p className="text-xs text-primary mt-1 italic">Không được bỏ trống số sao</p>}
                        <Box width="100%" className="my-6">
                          <Typography color="#fff">Review của bạn (có thể để trống)</Typography>
                          <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="placeholder:text-[#ffffff80] bg-bgd outline-none p-4 text-white rounded resize-none min-h-[150px] w-full mt-2"
                            placeholder="Đánh giá của bạn về bộ phim"
                          />
                        </Box>
                        <Box display="flex" justifyContent="flex-end">
                          <Button
                            disabled={router.query.movieType === 'coming-soon' ? true : false}
                            onClick={handleSendRating}
                            primary
                            small
                          >
                            Gửi
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                    {ratings?.length > 0 ? (
                      <>
                        <Box pt={2}>
                          {ratings?.map(rating => (
                            <Comment key={rating.id} rating={rating} />
                          ))}
                        </Box>
                        {ratingsPagination?.hasNextPage && (
                          <Box display="flex" justifyContent="center">
                            <Button
                              onClick={() => setCurrentPage(currentPage + 1)}
                              className="mt-6 w-full "
                              primary
                              large
                            >
                              Xem thêm
                            </Button>
                          </Box>
                        )}
                      </>
                    ) : (
                      <p className="text-center text-[#ffffffbf] my-4 italic">Chưa có đánh giá nào</p>
                    )}
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <h2 className="text-2xl text-white leading-[100%] relative pl-4">
                    Khuyến mại mới<p className="underline-title top-10"></p>
                  </h2>
                  <Grid container mt={3} spacing={2}>
                    <Grid item xs={6} sm={6} md={12}>
                      <img className=" cursor-pointer rounded-[4px]" src="/assets/images/event-1.jpg" alt="event" />
                    </Grid>
                    <Grid item xs={6} sm={6} md={12}>
                      <img className=" cursor-pointer rounded-[4px]" src="/assets/images/event-2.jpg" alt="event" />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpenTrailer}
        onClose={() => setIsOpenTrailer(false)}
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
          onClick={() => setIsOpenTrailer(false)}
          className="absolute  right-5 top-3 text-[18px] cursor-pointer hover:text-primary"
        />
      </Dialog>

      <Dialog
        open={isOpenLogin}
        onClose={() => setIsOpenLogin(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Bạn đã có tài khoản chưa?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Hãy đăng nhập tài khoản với chúng tôi để có thể thực hiện đánh giá bộ phim.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpenLogin(false)}>Hủy</Button>
          <Button className="h-10" primary onClick={() => router.push('/auth/login')}>
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

MovieDetailPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default MovieDetailPage;
