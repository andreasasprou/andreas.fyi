import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { LargeText, PageText } from 'components/PageText';
import { PageLink } from 'components/PageLink';
import { WebHeader } from './WebHeader';

interface WebLayoutProps {
  children: ReactNode;
  title: string | string[];
  ogImage?: string;
  url?: string;
  description?: string;
}

export function WebLayout({
  title,
  description = '',
  children,
  url,
  ogImage,
}: WebLayoutProps) {
  return (
    <div className="w-full h-full max-w-screen-lg mx-auto px-4 py-4 md:p-8">
      <NextSeo
        title={`${title} - Andreas Asprou`}
        description="Andreas Asprou."
        twitter={{
          handle: '@andyasprou',
          site: '@andyasprou',
          cardType: 'summary_large_image',
        }}
        {...(url
          ? {
              canonical: url,
            }
          : {})}
        {...(ogImage
          ? {
              openGraph: {
                url: url,
                title: title as string,
                description,
                images: [
                  {
                    url: ogImage,
                    width: 2400,
                    height: 1257,
                    alt: title as string,
                  },
                ],
                site_name: 'Andreas.fyi',
              },
            }
          : {})}
      />
      <WebHeader />
      <div className="py-5 md:py-12">{children}</div>
      {/*<SubscribeCard mt={4} />*/}
      <div className="mt-auto">
        <PageText>
          If you'd like to get in touch, consider{' '}
          <PageLink href="mailto:andyasprou@gmail.com?subject=Hello">
            writing an email
          </PageLink>{' '}
          or sending a{' '}
          <PageLink href="https://twitter.com/andyasprou/" target="_blank">
            Tweet
          </PageLink>
          .
        </PageText>
      </div>
    </div>
  );
}
