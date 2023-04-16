import { Badge, Box, ButtonBase, Divider, styled, useMediaQuery, Theme, Avatar } from '@mui/material';
import FlexBox from '@components/shared/flexbox/FlexBox';
import { H6, Small, Tiny } from '@components/shared/typography';
import { FC, Fragment, useRef, useState } from 'react';
import PopoverLayout from './PopoverLayout';
import { deleteCookie } from 'cookies-next';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { useSnackbar } from 'notistack';
import { onSignOut } from '@redux/slices/auth.slice';
import { useRouter } from 'next/router';

// styled components
const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  padding: 5,
  marginLeft: 4,
  borderRadius: 30,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': { backgroundColor: theme.palette.action.hover },
}));

const StyledSmall = styled(Small)(({ theme }) => ({
  display: 'block',
  cursor: 'pointer',
  padding: '5px 1rem',
  '&:hover': { backgroundColor: theme.palette.action.hover },
}));

const ProfilePopover: FC = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const upSm = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const handleMenuItem = (path: string) => {};

  const { account } = useAppSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(onSignOut());
    deleteCookie('accessToken');
    router.push('/admin/auth/login');
    enqueueSnackbar('Logout successfully', {
      variant: 'success',
    });
  };

  return (
    <Fragment>
      <StyledButtonBase disableRipple ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{
            alignItems: 'center',
            '& .MuiBadge-badge': {
              width: 11,
              height: 11,
              right: '4%',
              borderRadius: '50%',
              border: '2px solid #fff',
              backgroundColor: 'success.main',
            },
          }}
        >
          {upSm && (
            <Small mx={1} color="text.secondary">
              Xin chào,{' '}
              <Small fontWeight="600" display="inline">
                {account.fullName}
              </Small>
            </Small>
          )}
          <Avatar src={account.avatar || '/assets/images/avatar.jpg'} sx={{ width: 28, height: 28 }} />
        </Badge>
      </StyledButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center" gap={1}>
            <Avatar src={account.avatar || '/assets/images/avatar.jpg'} sx={{ width: 35, height: 35 }} />

            <Box>
              <H6>{account.fullName}</H6>
              <Tiny display="block" fontWeight={500} color="text.disabled">
                {account.email}
              </Tiny>
            </Box>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall onClick={() => handleMenuItem('/dashboards/profile')}>Trang cá nhân</StyledSmall>
          <StyledSmall onClick={() => handleMenuItem('/dashboards/account')}>Cài đặt</StyledSmall>
          <Divider sx={{ my: 1 }} />
          <StyledSmall
            onClick={() => {
              handleLogout();
            }}
          >
            Đăng xuất
          </StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
};

export default ProfilePopover;
