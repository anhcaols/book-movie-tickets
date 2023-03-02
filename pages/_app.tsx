import '../public/assets/styles/index.scss';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/dist/tippy.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import MainApp from '../src/App';
import store from '@redux/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import AppAuthentication from '@components/app/AppAuthentication';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
// Client-side cache, shared for the whole session of the user in the browser.

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  pageProps: any;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout || (page => page);
  return (
    <Provider store={store}>
      <AppAuthentication>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <MainApp>{getLayout(<Component {...pageProps} />)}</MainApp>
        </SnackbarProvider>
      </AppAuthentication>
    </Provider>
  );
}

export default MyApp;
