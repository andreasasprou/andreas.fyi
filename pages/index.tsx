 import React from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage } from 'shared/types';
import { VStack } from 'components/VStack';
import { PageLink } from 'components/PageLink';
import { LargeText } from 'components/PageText';
import { InferGetServerSidePropsType } from 'next';
import { APIRoutes, ROUTES } from '../shared/constants/client';
import { getPosts } from '../shared/server/blog/notion';

const Home: CustomPage = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <VStack className="max-w-article">
      <VStack>
        <LargeText>
          Hey there, I'm Andreas - an unapologetically unconventional guy with a
          borderline obsessive passion for what I do (and life).
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
          Currently obsessed with philosophy, diving deep into existentialism
          heavyweights like Sartre, Nietzsche, Camus, and Dostoevsky. Also
          exploring the biohacking/self-quantification, and the future of work.
        </LargeText>
        <LargeText>
          I'm into finding{' '}
          <PageLink href={ROUTES.Stuff.Home} target="_blank">
            cool stuff
          </PageLink>
          , and write{' '}
          <PageLink href={ROUTES.Writing.Home} target="_blank">
            here.
          </PageLink>
          .
        </LargeText>
      </VStack>
      <LargeText>
        Before the age of 24, I bootstrapped my first business{' '}
        <PageLink href="https://www.flick.social" target="_blank">
          Flick.social
        </PageLink>{' '}
        from 0 to 6 figure ARR in a few years, and since then worked on other fun stuff.
      </LargeText>
      <LargeText>
        e.g. my second startup{' '}
        <PageLink href="https://www.dweet.com" target="_blank">
          Dweet.com
        </PageLink>
        , the first talent marketplace for the Fashion & Luxury industry.
      </LargeText>
      <div>
        <LargeText>Recent Musings</LargeText>
        <ul className="list-disc pl-6 py-6 flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <LargeText>
                <PageLink href={ROUTES.Writing.post(post.slug)}>
                  {post.title}
                </PageLink>
              </LargeText>
            </li>
          ))}
        </ul>
        <LargeText>
          <PageLink href={ROUTES.Writing.Home}>See all -{'>'}</PageLink>
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

export const getServerSideProps = async () => {
  try {
    const posts = await getPosts();

    return {
      props: {
        posts: posts.data.slice(0, 3).map((post) => ({
          title: post.name,
          slug: post.slug,
        })),
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        posts: [],
      },
    };
  }
};

export default Home;
