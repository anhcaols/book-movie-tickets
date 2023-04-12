import { alpha, Box, ButtonBase, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

type CollapseCompact = { collapsed: number; compact: any };

const NavExpandRoot = styled(Box)(() => ({
  '& .subMenu': { padding: 0 },
  '& .expansion-panel': {
    '& .expansion-panel': { paddingLeft: 8 },
    overflow: 'hidden',
    transition: 'max-height 0.3s cubic-bezier(0, 0, 0.2, 1)',
  },
}));

const NavItemButton = styled(ButtonBase)<{ active: any }>(({ theme, active }) => ({
  height: 48,
  width: '100%',
  padding: '0 12px',
  borderRadius: 8,
  marginBottom: 5,
  justifyContent: 'space-between',
  backgroundColor: active ? alpha(theme.palette.primary.main, 0.06) : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ItemText = styled(Typography)<{ compact: any; active: any }>(({ theme, compact, active }) => ({
  whiteSpace: 'nowrap',
  paddingLeft: '0.8rem',
  fontSize: '13px',
  fontWeight: 500,
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  verticalAlign: 'middle',
  transition: 'all 0.15s ease',
  ...(compact && { opacity: 0, width: 0, paddingLeft: 0 }),
}));

const BadgeValue = styled(Box)<{ sidebarCompact: any }>(({ sidebarCompact, theme }) => ({
  fontSize: '12px',
  fontWeight: 500,
  color: 'white',
  padding: '1px 6px',
  overflow: 'hidden',
  borderRadius: '300px',
  transition: 'all 0.15s ease',
  backgroundColor: theme.palette.primary.main,
  ...(sidebarCompact && { opacity: 0, width: 0 }),
}));

interface SidebarAccordionProps {
  item: any;
  sidebarCompact: any;
  children: React.ReactNode;
}

const SidebarAccordion: FC<SidebarAccordionProps> = props => {
  const { item, children, sidebarCompact } = props;

  const elementRef = useRef<any>(null);
  const componentHeight = useRef(0);
  const router = useRouter();
  const { pathname } = router;
  const [collapsed, setCollapsed] = useState(false);
  const [hasActive, setHasActive] = useState(false);

  const { name, icon, iconText, badge } = item;

  const handleClick = () => {
    componentHeight.current = 0;
    calcaulateHeight(elementRef.current);
    setCollapsed(!collapsed);
  };

  const calcaulateHeight = useCallback((node: any) => {
    if (node.name !== 'child') {
      for (let child of node.children) {
        calcaulateHeight(child);
      }
    }

    if (node.name === 'child') componentHeight.current += node.scrollHeight;
    else componentHeight.current += 44; //here 44 is node height
    return;
  }, []);

  useEffect(() => {
    if (!elementRef) return;
    calcaulateHeight(elementRef.current);

    // OPEN DROPDOWN IF CHILD IS ACTIVE
    for (let child of item.children) {
      if (child.path === pathname) {
        setCollapsed(true);
        setHasActive(true);
      }
    }

    return () => {
      setHasActive(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcaulateHeight, pathname]);

  return (
    <NavExpandRoot className="subMenu">
      <NavItemButton onClick={handleClick} active={hasActive ? 1 : 0}>
        <Box pl="7px" display="flex" alignItems="center">
          {/* //@ts-ignore */}
          {icon && (
            <item.icon
              sx={{
                fontSize: 18,
                color: hasActive ? 'primary.main' : 'text.secondary',
                mr: '4px',
              }}
            />
          )}
          <ItemText compact={sidebarCompact} active={hasActive ? 1 : 0}>
            {name}
          </ItemText>
        </Box>

        {badge && (
          <BadgeValue sidebarCompact={sidebarCompact} className="itemIcon">
            {badge.value}
          </BadgeValue>
        )}
      </NavItemButton>

      <div
        ref={elementRef}
        className="expansion-panel"
        style={{
          maxHeight: !collapsed || sidebarCompact ? '0px' : componentHeight.current + 'px',
        }}
      >
        {children}
      </div>
    </NavExpandRoot>
  );
};

export default SidebarAccordion;
