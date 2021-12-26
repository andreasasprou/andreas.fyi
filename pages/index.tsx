import React, { forwardRef, Ref } from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage, PropsOf, StyleProps } from 'shared/types';
import classNames from 'classnames';
import { PageSection } from 'components/PageSection';
import { PageLink } from '../components/PageLink';

const HomeText = forwardRef(
  ({ className, ...rest }: PropsOf<'p'>, ref: Ref<HTMLParagraphElement>) => {
    return (
      <p
        ref={ref}
        className={classNames(
          'text-3xl md:text-4xl md:leading-normal leading-normal',
          className,
        )}
        {...rest}
      />
    );
  },
);

const Home: CustomPage = () => {
  return (
    <>
      <PageSection>
        <HomeText>
          Hey, I'm Andreas. A deliberate, unconventional and obsessive
          individual.
        </HomeText>
        <HomeText>
          The main purpose of this site is to document the lessons from over the
          last few years.
        </HomeText>
      </PageSection>
      <PageSection>
        <HomeText>
          I live to create ("workaholic"): attempting to optimize my life around
          being able to create exceptional products that feel like magic to use
          and learn as much as possible.
        </HomeText>
        <HomeText>
          I spend most of my time writing code and designing systems.
        </HomeText>
        <HomeText>
          In my down time I write & think deeply about my life philosophies,
          optimizing my health and my attempt to build strong relationships.
        </HomeText>
      </PageSection>
      <PageSection>
        <HomeText>
          You'll find me working on{' '}
          <PageLink href="https://www.flick.tech" target="_blank">
            Flick.tech
          </PageLink>{' '}
          and{' '}
          <PageLink href="https://www.dweet.com" target="_blank">
            Dweet.com
          </PageLink>
        </HomeText>
        <HomeText>
          If you'd like to get in touch, consider{' '}
          <PageLink href="mailto:andyasprou@gmail.com?subject=Hello">
            writing an email
          </PageLink>{' '}
          or sending a{' '}
          <PageLink href="https://twitter.com/andyasprou/" target="_blank">
            Tweet
          </PageLink>
          .
        </HomeText>
      </PageSection>
    </>
  );
};

Home.getLayout = (page) => <WebLayout title="Me">{page}</WebLayout>;

export default Home;
