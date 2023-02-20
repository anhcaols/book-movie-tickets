import '../public/assets/styles/index.scss';
import 'tippy.js/animations/perspective.css';
import 'tippy.js/dist/tippy.css';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import MainApp from '../src/App';

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
  return <MainApp>{getLayout(<Component {...pageProps} />)}</MainApp>;
}

export default MyApp;
