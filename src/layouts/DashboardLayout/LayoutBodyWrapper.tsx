import { Box, styled, SxProps } from '@mui/material';
import { FC, Fragment } from 'react';

// styled components
const Wrapper = styled(Box)(({ theme }) => ({
  paddingLeft: '3rem',
  paddingRight: '3rem',
  transition: 'all 0.3s',
  [theme.breakpoints.down(1200)]: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  background: '#171c24',
  minHeight: '100vh',
}));

const InnerWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: { maxWidth: 1200, margin: 'auto' },
}));

// --------------------------------------------
type LayoutBodyWrapperProps = {
  children?: React.ReactNode;
  sx?: any;
};

// --------------------------------------------

const LayoutBodyWrapper: FC<LayoutBodyWrapperProps> = ({ children, sx }) => {
  return (
    <Fragment>
      <Wrapper sx={sx}>
        <InnerWrapper>{children}</InnerWrapper>
      </Wrapper>
    </Fragment>
  );
};

export default LayoutBodyWrapper;
