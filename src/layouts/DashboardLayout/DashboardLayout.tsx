import { CSSProperties } from '@mui/styled-engine';
import LayoutBodyWrapper from './LayoutBodyWrapper';
import { FC, Fragment, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import { Box } from '@mui/material';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarCompact, setSidebarCompact] = useState(false);
  const [showMobileSideBar, setShowMobileSideBar] = useState(false);

  const handleCompactToggle = () => setSidebarCompact(!sidebarCompact);
  const handleMobileDrawerToggle = () => setShowMobileSideBar(state => !state);

  // dashboard body wrapper custom style
  const customStyle: CSSProperties = {
    width: `calc(100% - ${sidebarCompact ? '86px' : '280px'})`,
    marginLeft: sidebarCompact ? '86px' : '280px',
  };

  return (
    <div>
      <DashboardSidebar
        sidebarCompact={sidebarCompact}
        showMobileSideBar={showMobileSideBar}
        setSidebarCompact={handleCompactToggle}
        setShowMobileSideBar={handleMobileDrawerToggle}
      />

      <LayoutBodyWrapper sx={customStyle}>
        <DashboardHeader setShowSideBar={handleCompactToggle} setShowMobileSideBar={handleMobileDrawerToggle} />

        <Box pt={3}>{children}</Box>
      </LayoutBodyWrapper>
    </div>
  );
};

export default DashboardLayout;
