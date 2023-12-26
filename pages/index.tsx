import React from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage } from 'shared/types';
import { VStack } from 'components/VStack';
import { PageLink } from 'components/PageLink';
import { LargeText } from 'components/PageText';
import { APIRoutes, ROUTES } from '../shared/constants/client';

const Home: CustomPage = () => {
  return (
    <VStack className="max-w-article">
      <VStack>
        <LargeText>
          Hey, I'm Andreas. I'm unconventional, obsessive and passionate.
        </LargeText>
        <LargeText>
          I'm the co-founder of{' '}
          <PageLink href="https://www.flick.social" target="_blank">
            Flick.social
          </PageLink>{' '}
          and{' '}
          <PageLink href="https://www.dweet.com" target="_blank">
            Dweet.com
          </PageLink>
          .
        </LargeText>
        <LargeText>
          Currently obsessed with existential philosophy (Sartre, Nietzsche, Camus, and Dostoevsky) biohacking/self-discovery with AI and the future of work.</LargeText>
        <LargeText>
          I'm into finding <PageLink
          href={ROUTES.Stuff.Home}
          target="_blank"
        >
          cool products
        </PageLink>.
        </LargeText>
      </VStack>
      <div className="space-y-4 md:space-y-8">
        <LargeText>
          I'm currently in my late 30s. Before the age of 24, my timeline included:
          <ul className="list-disc pl-6 py-6">
            <li>
              Bootstrapped my first business{' '}
              <PageLink href="https://www.flick.social" target="_blank">
                Flick.social
              </PageLink>{' '}
              (with my incredible team) from $0 to $3M ARR within a couple of years. This was done whilst I studied computer science at Imperial College London, graduating in the top 3 of the cohort.
            </li>
            <li>
              Co-founded my second business{' '}
              <PageLink href="https://www.dweet.com" target="_blank">
                Dweet.com
              </PageLink>, the first talent marketplace for the Fashion & Luxury industry.
            </li>
            <li>
              Produced award winning{' '}
              <PageLink
                href="https://www.imperial.ac.uk/media/imperial-college/faculty-of-engineering/computing/public/1718-ug-projects/Andreas-Asprou-Determining-(emerging)-sub-cultures-of-online-social-influencers-on-Instagram.pdf"
                target="_blank"
              >
                research
              </PageLink>{' '}
              in the space of classification, NLP, graph embeddings,
              recommendation systems, taxonomy construction and how they can be
              applied to the Instagram Marketing industry. <br /> This research
              acted as the foundations for the algorithms at Flick, which now
              powers millions of hashtag searches for 100k+ users.
            </li>
          </ul>
        </LargeText>
      </div>
    </VStack>
  );
};

Home.getLayout = (page) => (
  <WebLayout
    title="Me"
    ogImage={`${APIRoutes.OG_IMAGE}/${encodeURIComponent('Home')}`}
    url={`https://andreas.fyi${ROUTES.Home}`}
  >
    {page}
  </WebLayout>
);

export default Home;
