/* eslint-disable @next/next/no-img-element */
import { Box } from '@mui/material';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const AuthenticationLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ backgroundImage: `url(/assets/images/section.jpg)` }}>
      <Box
        className="container flex flex-row flex-wrap justify-center  items-center
      mx-auto pl-[15px] pr-[15px] "
      >
        <Box className="flex justify-center items-center w-full min-h-[100vh] py-[40px] ">
          <Box className="w-full max-w-lg px-9 py-10 bg-[#28282d] shadow-xl rounded border-t-2 border-primary ">
            <Box className="flex justify-center items-center mb-12">
              <Link href={'/'}>
                <img className="max-w-[127px]" src={'/assets/images/logo.svg'} alt="img" />
              </Link>
            </Box>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticationLayout;
