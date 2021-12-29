import React from 'react';
import {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next';
import { WebLayout } from 'components/layouts/WebLayout';
import { APIRoutes, ROUTES } from 'shared/constants/client';
import { BlockRenderer } from 'components/notion/BlockRenderer';
import { TableOfContents } from 'components/notion/TableOfContents';
import { getAllPosts, getPostBySlug } from 'shared/server/blog/notion';
import { PageHeader } from '../../components/PageHeader';

function SlugPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <WebLayout
      title={post.pageInfo.name}
      description={post.pageInfo.excerpt}
      ogImage={`${APIRoutes.OG_IMAGE}/${encodeURIComponent(
        post.pageInfo.name,
      )}.jpeg`}
      url={`https://andreas.fyi${ROUTES.Writing.post(post.pageInfo.slug)}`}
    >
      <PageHeader
        title={post.pageInfo.name}
        subTitle={post.pageInfo.excerpt}
        createdAt={new Date(post.pageInfo.publishedDate)}
      />
      <div className="flex w-full leading-8 text-lg mx-auto">
        <div className="w-full lg:max-w-article">
          {post.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
        <TableOfContents toc={post.toc} />
      </div>
    </WebLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();

  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: 'blocking',
  };
};

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post = await getPostBySlug(String(params!.slug));

  return {
    props: {
      post,
    },
    revalidate: 1,
  };
}

export default SlugPage;
