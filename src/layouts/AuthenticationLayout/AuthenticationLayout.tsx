import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

const AuthenticationLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ backgroundImage: `url(/assets/images/section.jpg)` }}>
      <Box
        className="container flex flex-row flex-wrap justify-center  items-center
      mx-auto pl-[15px] pr-[15px] "
      >
        <Box className="flex justify-center items-center w-full min-h-[100vh] py-[40px] ">{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthenticationLayout;
