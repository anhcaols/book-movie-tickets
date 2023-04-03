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
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@redux/store';

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
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
