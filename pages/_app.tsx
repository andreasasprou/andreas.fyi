import 'nprogress/nprogress.css';
import 'styles/globals.css';
import NProgress from 'nprogress';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { Router } from 'next/router';
import { CustomPage } from 'shared/types';
import { RecoilRoot } from 'recoil';

export type CustomAppProps<P = {}> = AppPropsType<Router, P> & {
  Component: CustomPage;
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>;
}

export default MyApp;
