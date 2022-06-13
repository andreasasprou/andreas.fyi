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
import { ClientConstants } from '../shared/constants/client';

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
      {ClientConstants.isProd && (
        <>
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
          <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3006162,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');    
                  `,
            }}
          />
        </>
      )}
      {getLayout(<Component {...pageProps} />)}
    </RecoilRoot>
  );
}

export default MyApp;
