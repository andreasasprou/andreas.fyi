import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { LargeText, PageText } from 'components/PageText';
import { PageLink } from 'components/PageLink';
import { StyleProps } from 'shared/types';
import classNames from 'classnames';
import { WebHeader } from './WebHeader';

interface WebLayoutProps extends StyleProps {
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
  className,
}: WebLayoutProps) {
  return (
    <div
      className={classNames(
        'flex flex-col max-w-screen-xl mx-auto px-4 py-4 md:p-8 min-h-[100vh]',
        className,
      )}
    >
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
      <div className="py-8 md:py-16">{children}</div>
      {/*<SubscribeCard mt={4} />*/}
      <div className="mt-auto">
        <p className="leading-8">
          If you'd like to get in touch, consider{' '}
          <PageLink href="mailto:andyasprou@gmail.com?subject=Hello">
            writing an email
          </PageLink>{' '}
          or sending a{' '}
          <PageLink href="https://twitter.com/andyasprou/" target="_blank">
            Tweet
          </PageLink>
          .
        </p>
      </div>
    </div>
  );
}
