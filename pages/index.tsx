 import React from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage } from 'shared/types';
import { VStack } from 'components/VStack';
import { PageLink } from 'components/PageLink';
import { LargeText } from 'components/PageText';
import { InferGetServerSidePropsType } from 'next';
import { APIRoutes, ROUTES } from '../shared/constants/client';
import { getPostsCombined } from '../shared/server/blog/notion';

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
          <PageLink
            href="https://plrs.sh/home?utm_source=andreas.fyi&utm_medium=referral&utm_campaign=homepage"
            target="_blank"
          >
            Polaris
          </PageLink>
          , a cloud workbench for coding agents. Run Claude Code, Codex and Pi
          on your own subscriptions or API keys, each on its own machine, and
          pick up any session from any device.
        </LargeText>
        <LargeText>
          <PageLink href="https://nova.dweet.com" target="_blank">
            Nova
          </PageLink>
          , an AI agent for recruiting. Finds and assesses candidates for
          agencies and in-house teams, across their applicants, their own
          database and the wider market.
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
    const posts = await getPostsCombined();

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
