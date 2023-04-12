import { Box, styled } from '@mui/material';
import FlexBox from '@components/shared/flexbox/FlexBox';
import Scrollbar from '@components/shared/scroll-bar';
import LayoutDrawer from './LayoutDrawer';
import { FC } from 'react';
import MultiLevelMenu from './MultiLevelMenu';
import Link from 'next/link';

const TOP_HEADER_AREA = 70;

const NavWrapper = styled(Box)<{ compact: any }>(() => ({
  paddingLeft: 16,
  paddingRight: 16,
  height: '100%',
}));

const StyledLogo = styled(Box)(() => ({
  paddingLeft: 8,
  fontWeight: 700,
  fontSize: 20,
}));

interface MobileSidebarProps {
  sidebarCompact: boolean;
  showMobileSideBar: boolean;
  setShowMobileSideBar: () => void;
}

const MobileSidebar: FC<MobileSidebarProps> = props => {
  const { sidebarCompact, showMobileSideBar, setShowMobileSideBar } = props;

  return (
    <LayoutDrawer open={showMobileSideBar} onClose={setShowMobileSideBar}>
      <Box className="flex items-center justify-start" px={3} py={2} maxHeight={TOP_HEADER_AREA}>
        <Link href={'/admin'}>
          <h2 className=" text-2xl  font-bold ">
            ANH<span className="text-primary">LS</span>
          </h2>
        </Link>
      </Box>

      <NavWrapper compact={sidebarCompact}>
        <MultiLevelMenu sidebarCompact={false} />
      </NavWrapper>
    </LayoutDrawer>
  );
};

export default MobileSidebar;
