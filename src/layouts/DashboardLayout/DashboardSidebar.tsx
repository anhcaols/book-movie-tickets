import { Box, IconButton, styled, Theme, useMediaQuery } from '@mui/material';
import FlexBetween from '@components/shared/flexbox/FlexBetween';
import FlexBox from '@components/shared/flexbox/FlexBetween';
import Scrollbar from '@components/shared/scroll-bar';
import { FC, useState } from 'react';
import MultiLevelMenu from './MultiLevelMenu';
import MobileSidebar from './MobileSidebar';
import Link from 'next/link';

const TOP_HEADER_AREA = 70;

const SidebarWrapper = styled(Box)<{ compact: any }>(({ theme, compact }) => ({
  height: '100vh',
  position: 'fixed',
  width: compact ? 86 : 280,
  transition: 'all .2s ease',
  zIndex: theme.zIndex.drawer,
  backgroundColor: '#222b36',
  '&:hover': compact && { width: 280 },
}));

const NavWrapper = styled(Box)(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  height: '100%',
}));

const StyledLogo = styled(Box)(() => ({
  paddingLeft: 8,
  fontWeight: 700,
  fontSize: 20,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': { backgroundColor: theme.palette.action.hover },
}));

// -----------------------------------------------------------------------------
type DashboardSidebarProps = {
  sidebarCompact: boolean;
  showMobileSideBar: boolean;
  setSidebarCompact: () => void;
  setShowMobileSideBar: () => void;
};
// -----------------------------------------------------------------------------

const DashboardSidebar: FC<DashboardSidebarProps> = props => {
  const { sidebarCompact, showMobileSideBar, setShowMobileSideBar, setSidebarCompact } = props;

  const [onHover, setOnHover] = useState(false);
  const downLg = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // Activate compact when toggle button clicked and not on hover state
  const COMPACT = sidebarCompact && !onHover ? 1 : 0;

  //   IF MOBILE
  if (downLg) {
    return (
      <MobileSidebar
        sidebarCompact={!!COMPACT}
        showMobileSideBar={!!showMobileSideBar}
        setShowMobileSideBar={setShowMobileSideBar}
      />
    );
  }

  return (
    <SidebarWrapper
      compact={sidebarCompact}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => sidebarCompact && setOnHover(false)}
    >
      <FlexBetween pt={3} pr={2} pl={4} pb={1} height={TOP_HEADER_AREA}>
        {/* LOGO */}
        <Link href={'/admin'}>
          <h2 className=" text-2xl  font-bold ">
            ANH<span className="text-primary">LS</span>
          </h2>
        </Link>
        <Box mx={'auto'}></Box>

        {/* SIDEBAR COLLAPSE BUTTON */}
        <StyledIconButton
          onClick={setSidebarCompact}
          sx={{
            display: COMPACT ? 'none' : 'block',
          }}
        ></StyledIconButton>
      </FlexBetween>

      {/* NAVIGATION ITEMS */}
      <NavWrapper>
        <MultiLevelMenu sidebarCompact={!!COMPACT} />
      </NavWrapper>
    </SidebarWrapper>
  );
};

export default DashboardSidebar;
