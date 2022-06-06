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
          Hey, I'm Andreas. A deliberate, unconventional, obsessive and
          intensely passionate individual. This is my personal brain dump.
        </LargeText>
        <LargeText>
          You'll find me wandering around the world, slowly. Currently spending
          60% of my time between London & Lisbon.
        </LargeText>
        <LargeText>
          I live to create things people love. This is often confused with being
          a "workaholic": attempting to optimize my life around being able to
          create exceptional products that feel like magic to use and learn as
          much as possible.
        </LargeText>
        <LargeText>
          I spend most of my time exploring (the mind & the world), building
          products, writing code, and designing systems to streamline the
          process of building & running Flick & Dweet.
        </LargeText>
      </VStack>
      <div className="space-y-4 md:space-y-8">
        <LargeText>
          Through my journey, I've been exposed to a huge number of interesting
          problems.
        </LargeText>
        <LargeText>
          This website aims to share the lessons I've learned through my densely
          packed early 20s. Before the age of 24, my timeline includes:
          <ul className="list-disc pl-6 py-6">
            <li>
              Bootstrapped my first business{' '}
              <PageLink href="https://www.flick.tech" target="_blank">
                Flick.tech
              </PageLink>{' '}
              with my incredible team from $0 to $3M ARR within a couple of
              years, for which I solo-engineered for most of it's lifetime. This
              was done while graduating computer science at Imperial College
              London in the top 3 of my cohort.
            </li>
            <li>
              Co-founded my second business{' '}
              <PageLink href="https://www.dweet.com" target="_blank">
                Dweet.com
              </PageLink>
              , the first ever freelance marketplace for the Luxury, Fashion and
              Retail industries. At Dweet, we're on a mission to empower people
              in the Luxury & Fashion industry to have independence and
              flexibility, deciding how, when and for whom they work.
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
            <li>
              Created & solo-engineered multiple side projects/businesses,
              including:
              <PageLink href="https://www.garn.io" target="_blank">
                Garn.io
              </PageLink>
            </li>
          </ul>
        </LargeText>
      </div>
      <VStack>
        <LargeText>
          Finding the ultimate form of things proper gets me going, all the way
          from finding the farms with highest quality pork (mangalitza) in the
          world to the perfect suitcase.
        </LargeText>
        <LargeText>
          When I manage to pry myself from my work, I love to experience the
          best that life has to offer via experiences, inspiring people and
          consuming stuff.
        </LargeText>
        <LargeText>
          I'm a practicing biohacker (quantified self), [novice] philosopher of
          life (e.g. Stoicism, Buddhism etc) and lifestyle designer.
        </LargeText>
      </VStack>
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
