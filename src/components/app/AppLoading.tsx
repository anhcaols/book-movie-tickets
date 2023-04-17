import NProgress from 'nprogress';
import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';

export interface AppLoadingProps {
  fullScreen?: boolean;
  handleOnLoading?: () => void;
}

const AppLoading = ({ fullScreen, handleOnLoading }: AppLoadingProps) => {
  NProgress.configure({
    showSpinner: false,
  });

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullScreen ? '100vh' : '100%',
        width: fullScreen ? '100vw' : '100%',
      }}
      ref={() => {
        if (handleOnLoading) {
          handleOnLoading();
        }
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default AppLoading;
