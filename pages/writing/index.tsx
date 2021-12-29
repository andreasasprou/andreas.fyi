import React from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage } from 'shared/types';
import { InferGetStaticPropsType } from 'next';
import { getPosts } from 'shared/server/blog/notion';
import { APIRoutes, ROUTES } from 'shared/constants/client';
import { PageHeader } from 'components/PageHeader';
import { PostSummaryLink } from 'components/PostSummaryLink';

const Blog: CustomPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageHeader title="Writing" className="border-b-0 pb-2 md:pb-4" />
      <div className="space-y-4 md:space-y-6">
        {posts.data.map((post) => (
          <PostSummaryLink
            {...post}
            href={ROUTES.Writing.post(post.slug)}
            key={post.slug}
          />
        ))}
      </div>
    </>
  );
};

Blog.getLayout = (page) => (
  <WebLayout
    title="Blog"
    ogImage={`${APIRoutes.OG_IMAGE}/${encodeURIComponent('Blog')}`}
    url={`https://andreas.fyi${ROUTES.Writing.Home}`}
  >
    {page}
  </WebLayout>
);

export async function getStaticProps() {
  return {
    props: {
      posts: await getPosts(),
    },
    revalidate: 1,
  };
}

export default Blog;
