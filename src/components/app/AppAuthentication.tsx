import { useAppDispatch } from '@hooks/useRedux';
import { onSignInSuccess } from '@redux/slices/auth.slice';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React from 'react';
import { authService } from 'services/auth.service';

export interface AppAuthenticationProps {
  children?: React.ReactNode;
}

let didInit = false;
const AppAuthentication = ({ children }: AppAuthenticationProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  function validateTokenOnAppStartup() {
    if (!didInit) {
      didInit = true;
      const accessToken = getCookie('accessToken');

      if (accessToken) {
        authService
          .validateToken({
            token: accessToken as string,
          })
          .then(async (res: any) => {
            authService.setToken(accessToken as string);
            dispatch(
              onSignInSuccess({
                id: res.account.id,
                fullName: res.account.fullName,
                email: res.account.email,
                phoneNumber: res.account.phoneNumber,
                gender: res.account.gender,
                dateOfBirth: res.account.dateOfBirth,
                avatar: res.account.avatar,
                role: res.account.role,
              })
            );
          })
          .catch(() => {
            deleteCookie('accessToken');
            return router.push('/auth/login');
          });
      }
    }
  }

  return (
    <div
      ref={() => {
        validateTokenOnAppStartup();
      }}
    >
      {children}
    </div>
  );
};

export default AppAuthentication;
