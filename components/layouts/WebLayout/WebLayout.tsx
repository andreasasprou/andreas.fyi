import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
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
    <div className="w-full h-full space-x-4">
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
      <div className="max-w-screen-lg mx-auto px-4 py-10">
        <WebHeader />
        <div className="pt-8">{children}</div>
        {/*<SubscribeCard mt={4} />*/}
      </div>
    </div>
  );
}
