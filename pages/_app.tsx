import 'nprogress/nprogress.css';
import 'styles/globals.css';
import NProgress from 'nprogress';
import { AppPropsType } from 'next/dist/shared/lib/utils';
import { Router, useRouter } from 'next/router';
import { CustomPage } from 'shared/types';
import { RecoilRoot } from 'recoil';
import Script from 'next/script';
import { useEffect } from 'react';
import { GA_TRACKING_ID, gtag } from '../shared/gtag';

export type CustomAppProps<P = {}> = AppPropsType<Router, P> & {
  Component: CustomPage;
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.page(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {getLayout(<Component {...pageProps} />)}
    </RecoilRoot>
  );
}

export default MyApp;
