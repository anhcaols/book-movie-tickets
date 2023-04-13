import { AppBar, Box, ClickAwayListener, IconButton, styled, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import SearchBar from './SearchBar';
import { useRouter } from 'next/router';
import { SearchOutlined } from '@mui/icons-material';
import ProfilePopover from './popovers/ProfilePopover';

// ------------------------------------------------
type DashboardHeaderProps = {
  setShowSideBar: () => void;
  setShowMobileSideBar: () => void;
};
// ------------------------------------------------

// custom styled components
const DashboardHeaderRoot = styled(AppBar)(({ theme }) => ({
  zIndex: 11,
  boxShadow: 'none',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  backdropFilter: 'blur(6px)',
  backgroundColor: 'transparent',
  color: theme.palette.text.primary,
  backgroundImage: 'none',
}));

const StyledToolBar = styled(Toolbar)(() => ({
  '@media (min-width: 0px)': {
    paddingLeft: 0,
    paddingRight: 0,
    minHeight: 'auto',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': { backgroundColor: theme.palette.action.hover },
}));

const ToggleIcon = styled(Box)<{ width?: number }>(({ theme, width }) => ({
  height: 3,
  margin: '5px',
  marginLeft: 0,
  width: width || 25,
  borderRadius: '10px',
  transition: 'width 0.3s',
  backgroundColor: theme.palette.primary.main,
}));

const DashboardHeader: FC<DashboardHeaderProps> = props => {
  const { setShowMobileSideBar } = props;
  const router = useRouter();

  const [openSearchBar, setSearchBar] = useState(false);
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down(1200));

  return (
    <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        {downMd && router.pathname !== '/getting-started' && (
          <Box sx={{ cursor: 'pointer' }} onClick={setShowMobileSideBar}>
            <ToggleIcon />
            <ToggleIcon width={18} />
            <ToggleIcon width={9} />
          </Box>
        )}

        {router.pathname !== '/getting-started' && (
          <ClickAwayListener onClickAway={() => setSearchBar(false)}>
            <Box>
              {!openSearchBar && (
                <StyledIconButton onClick={() => setSearchBar(true)}>
                  <SearchOutlined fontSize="medium" className="text-[#455a79]" />
                </StyledIconButton>
              )}
              <SearchBar open={openSearchBar} handleClose={() => setSearchBar(false)} />
            </Box>
          </ClickAwayListener>
        )}
        <Box flexGrow={1} ml={1} />
        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>
  );
};

export default DashboardHeader;
