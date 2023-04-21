import { useAppDispatch } from '@hooks/useRedux';
import { onSignInSuccess } from '@redux/slices/auth.slice';
import { onClearInvoiceData } from '@redux/slices/invoiceData.slice';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { authService } from 'services/auth.service';
import AppLoading from './AppLoading';

export interface AppAuthenticationProps {
  children?: React.ReactNode;
}

let didInit = false;
const AppAuthentication = ({ children }: AppAuthenticationProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isValidatingToken, setIsValidatingToken] = useState(false);
  // if (router.pathname === '/choose-seat/[chooseSeat]' || router.pathname === '/choose-seat/[chooseFood]') {
  //   dispatch(onClearInvoiceData());
  // }

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
            setIsValidatingToken(true);
            if (router.pathname.startsWith('/admin') && res.account.role !== 'admin') {
              await router.push('/').then(() => {
                setIsValidatingToken(false);
              });
            }
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
          })
          .finally(() => {
            setIsValidatingToken(false);
          });
      } else {
        if (router.pathname.startsWith('/admin')) {
          setIsValidatingToken(true);
          router.push('/auth/login').then(() => {
            setIsValidatingToken(false);
          });
        }
      }
    }
  }

  return (
    <div
      ref={() => {
        validateTokenOnAppStartup();
      }}
    >
      {isValidatingToken ? <AppLoading fullScreen /> : children}
    </div>
  );
};

export default AppAuthentication;
