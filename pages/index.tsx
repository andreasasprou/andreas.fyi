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
          Hey there, I'm Andreas. I build things and I don't really stop
          thinking about them.
        </LargeText>
        <LargeText>
          I'm building a few things right now:
        </LargeText>
        <LargeText>
          <PageLink href="https://nova.dweet.com" target="_blank">
            Nova
          </PageLink>
          , OpenClaw for recruiters. Screens, sources, and rediscovers
          candidates across your existing tools.
        </LargeText>
        <LargeText>
          <PageLink href="https://www.intavia.ai" target="_blank">
            Intavia
          </PageLink>
          , AI receptionists for appointment-led businesses.
        </LargeText>
        <LargeText>
          <PageLink href="https://www.ai-primer.com/engineer" target="_blank">
            AI Primer
          </PageLink>
          , the AI news firehose distilled daily.
        </LargeText>
        <LargeText>
          <PageLink href="https://github.com/andreasasprou/polaris" target="_blank">
            Polaris
          </PageLink>
          , open source Devin. Bring your own API keys.
        </LargeText>
      </VStack>
      <LargeText>
        Before the age of 24, I bootstrapped{' '}
        <PageLink href="https://www.flick.social" target="_blank">
          Flick
        </PageLink>{' '}
        from 0 to 6 figure ARR. Then built{' '}
        <PageLink href="https://www.dweet.com" target="_blank">
          Dweet
        </PageLink>
        , the first talent marketplace for Fashion & Luxury, which evolved
        into Nova.
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
