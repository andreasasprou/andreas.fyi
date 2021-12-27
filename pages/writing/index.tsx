import React from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage } from 'shared/types';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import dayjs from 'dayjs';
import { getPosts } from 'shared/server/blog/notion';
import { APIRoutes, ROUTES } from 'shared/constants/client';
import { ArrowRightIcon } from '@heroicons/react/solid';
import { PageHeader } from '../../components/PageHeader';

interface PostLinkProps {
  href: string;
  title: string;
  excerpt: string;
  date: string;
}

function PostLink({ href, title, excerpt, date }: PostLinkProps) {
  return (
    <Link href={href} passHref>
      <div className="max-w-article flex justify-between items-center maxW-[700] bg-gray-900 p-4 hover:cursor-pointer hover:bg-gray-800 transition-all">
        <div>
          <p className="text-brand-500 text-lg font-medium mb-2">{title}</p>
          <p className="text-lg">{excerpt}</p>
          <p className="mt-2 text-white/70">{date}</p>
        </div>
        <ArrowRightIcon className="w-6 ml-auto md:block ml-8 hidden" />
      </div>
    </Link>
  );
}

const Blog: CustomPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <PageHeader title="Writing" />
      <div className="space-y-4">
        {posts.data.map((post) => (
          <PostLink
            title={post.name}
            excerpt={post.excerpt}
            href={ROUTES.Writing.post(post.slug)}
            date={dayjs(new Date(post.created)).format('DD/MM/YYYY')}
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
  };
}

export default Blog;
