import MainLayout from '@layouts/MainLayout/MainLayout';
import { NextPageWithLayout } from '../_app';
import { Box, Button, InputAdornment, InputBase, Pagination, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { onSearchMovie } from '@redux/actions/movies.action';
import { ChangeEvent, useState } from 'react';
import { useAsync } from '@hooks/useAsync';
import { LoadingButton } from '@mui/lab';
import MovieItem from '@components/shared/movie-item/MovieItem';

const SearchPage: NextPageWithLayout = () => {
  const [value, setValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const { allMovies } = useAppSelector(state => state.movies);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setIsLoading(true);
    const payload = {
      keyword: value,
    };
    executeSearch(payload);
  };

  const [executeSearch] = useAsync<{
    keyword: string;
  }>({
    delay: 600,
    asyncFunction: async payload => dispatch(onSearchMovie(payload)),
    onResolve: () => {
      setIsLoading(false);
    },
    onReject: (error: any) => {
      setIsLoading(false);
    },
  });
  return (
    <>
      <Box className="container flex flex-row flex-wrap content-center items-center mx-auto pt-4 pb-16 px-4">
        <Box className=" min-h-[60vh] w-full">
          <Box
            sx={{
              gap: 2,
              height: 70,
              marginTop: '20px',
              boxShadow: 1,
              display: 'flex',
              padding: '0 1rem',
              borderRadius: '4px',
              alignItems: 'center',
              backgroundColor: '#28282d',
              justifyContent: 'center',
            }}
          >
            <InputBase
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              fullWidth
              autoFocus
              placeholder="Nhập tên phim..."
              startAdornment={
                <InputAdornment position="start">
                  <SearchOutlined className="text-text" fontSize="medium" />
                </InputAdornment>
              }
              sx={{ fontSize: 13, fontWeight: 500, flexGrow: 1 }}
            />
            <LoadingButton
              loading={isLoading}
              disabled={value === ''}
              style={{ minWidth: 120 }}
              variant={value == '' ? 'outlined' : 'contained'}
              onClick={handleSearch}
            >
              Tìm kiếm
            </LoadingButton>
          </Box>

          {allMovies?.movies?.length > 0 ? (
            <Box>
              <Box className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 py-8">
                {allMovies?.movies?.map(movie => (
                  <MovieItem movie={movie} key={movie.id} state="now-showing" />
                ))}
              </Box>
              {allMovies?.movies.length > 0 && (
                <Box className="container flex flex-row flex-wrap content-center justify-center items-center pb-8">
                  <Pagination
                    count={allMovies.paginationOptions.totalPages}
                    onChange={handleChangePage}
                    className="mt-12"
                    size="large"
                    variant="outlined"
                    shape="rounded"
                  />
                </Box>
              )}
            </Box>
          ) : (
            <Typography className="text-text pt-9 text-center italic font-medium"> </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

SearchPage.getLayout = page => <MainLayout>{page}</MainLayout>;

export default SearchPage;
