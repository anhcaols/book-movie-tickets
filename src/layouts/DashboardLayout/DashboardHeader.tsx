import { AppBar, Box, ClickAwayListener, IconButton, styled, Theme, Toolbar, useMediaQuery } from '@mui/material';
import { FC, Fragment, useContext, useState } from 'react';
// import { SettingsContext } from "contexts/settingsContext";
// import MenuLeft from "icons/MenuLeft";
// import MenuLeftRight from "icons/MenuLeftRight";
// import SearchIcon from "icons/SearchIcon";
// import ThemeIcon from "icons/ThemeIcon";
// import { themeSettingsTypes } from "theme";
// import LanguagePopover from "./popovers/LanguagePopover";
// import NotificationsPopover from "./popovers/NotificationsPopover";
// import ProfilePopover from "./popovers/ProfilePopover";
// import ServicePopover from "./popovers/ServicePopover";
import SearchBar from './SearchBar';

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
  backgroundColor: '#222b36',
  color: theme.palette.text.primary,
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

  const [openSearchBar, setSearchBar] = useState(false);
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down(1200));

  return (
    <DashboardHeaderRoot position="sticky">
      <StyledToolBar>
        {downMd && (
          <Box sx={{ cursor: 'pointer' }} onClick={setShowMobileSideBar}>
            <ToggleIcon />
            <ToggleIcon width={18} />
            <ToggleIcon width={9} />
          </Box>
        )}

        <ClickAwayListener onClickAway={() => setSearchBar(false)}>
          <Box>
            {!openSearchBar && <StyledIconButton onClick={() => setSearchBar(true)}></StyledIconButton>}

            <SearchBar open={openSearchBar} handleClose={() => setSearchBar(false)} />
          </Box>
        </ClickAwayListener>

        <Box flexGrow={1} ml={1} />
      </StyledToolBar>
    </DashboardHeaderRoot>
  );
};

export default DashboardHeader;
