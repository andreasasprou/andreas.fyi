import React from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage } from 'shared/types';
import { VStack } from 'components/VStack';
import { PageLink } from 'components/PageLink';
import { LargeText } from 'components/PageText';

const Home: CustomPage = () => {
  return (
    <VStack className="max-w-article">
      <VStack>
        <LargeText>
          Hey, I'm Andreas. A deliberate, unconventional and obsessive
          individual. This is my personal brain dump.
        </LargeText>
      </VStack>
      <VStack>
        <LargeText>
          I live to create ("workaholic"): attempting to optimize my life around
          being able to create exceptional products that feel like magic to use
          and learn as much as possible.
        </LargeText>
        <LargeText>
          I spend most of my time writing code and designing systems.
        </LargeText>
        <LargeText>
          In my down time I write & think deeply about my life philosophies,
          optimizing my health and my attempt to build strong relationships.
        </LargeText>
      </VStack>
      <VStack>
        <LargeText>
          You'll find me working on{' '}
          <PageLink href="https://www.flick.tech" target="_blank">
            Flick.tech
          </PageLink>{' '}
          and{' '}
          <PageLink href="https://www.dweet.com" target="_blank">
            Dweet.com
          </PageLink>
        </LargeText>
        <LargeText>
          If you'd like to get in touch, consider{' '}
          <PageLink href="mailto:andyasprou@gmail.com?subject=Hello">
            writing an email
          </PageLink>{' '}
          or sending a{' '}
          <PageLink href="https://twitter.com/andyasprou/" target="_blank">
            Tweet
          </PageLink>
          .
        </LargeText>
      </VStack>
    </VStack>
  );
};

Home.getLayout = (page) => <WebLayout title="Me">{page}</WebLayout>;

export default Home;
