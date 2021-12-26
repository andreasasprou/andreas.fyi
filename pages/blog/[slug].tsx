import React from 'react';
import {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import dayjs from 'dayjs';
import { WebLayout } from 'components/layouts/WebLayout';
import { ROUTES } from 'shared/constants/client';
import { getPostBySlug } from 'shared/server/notion';
import { RenderBlock } from 'components/notion/RenderBlock';
import { TableOfContents } from 'components/notion/TableOfContents';

function SlugPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <WebLayout
      title={post.pageInfo.name}
      description={post.pageInfo.excerpt}
      ogImage="https://andreas.fyi/key-chars-of-early-stage-founders-og-image.jpg"
      url={`https://andreas.fyi${ROUTES.Blog.post(post.pageInfo.slug)}`}
    >
      <div className="border-b  border-b-white/20 pb-4 mb-4">
        <h1 className="mb-6 md:text-6xl text-4xl font-bold text-white/90 leading-normal">
          {post.pageInfo.name}
        </h1>
        <p className="mb-4 text-xl text-white/80">{post.pageInfo.excerpt}</p>
        <p className="text-white/70">
          {dayjs(new Date(post.pageInfo.created)).format('MMM D, YYYY')}
        </p>
      </div>
      <div className="flex w-full leading-8 text-lg mx-auto">
        <div className="w-full lg:max-w-[800px]">
          {post.blocks.map((block) => (
            <RenderBlock key={block.id} block={block} />
          ))}
        </div>
        <TableOfContents toc={post.toc} />
      </div>
    </WebLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post = await getPostBySlug(String(params!.slug));

  return {
    props: {
      post,
    },
  };
}

export default SlugPage;
