import React, { useState } from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage, NotionStuffItem } from 'shared/types';
import { InferGetStaticPropsType } from 'next';
import { APIRoutes, ROUTES } from 'shared/constants/client';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { getAllStuff } from '../shared/server/blog/stuff';
import { PageHeader } from '../components/PageHeader';
import { StuffFilter } from '../components/stuff/StuffFilter';
import { PageLink } from '../components/PageLink';

function StuffItem({ url, tags, name, notes = '' }: NotionStuffItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="rounded-sm flex md:flex-row flex-col md:justify-between md:items-center max-w-article bg-white/5 p-2 md:p-3 hover:cursor-pointer hover:bg-white/10 transition-all"
    >
      <div>
        <p className="text-white/80 md:text-md font-medium">{name}</p>
        {notes.length > 0 && <p className="text-sm mt-2">{notes}</p>}
        <div className="flex items-start md:items-center md:flex-row flex-col md:space-y-0 space-y-1 md:space-x-1 mt-3">
          {tags.map((tag) => (
            <div className="px-2 pb-[2px] border-solid border-[1px] border-white/10 rounded-sm">
              <span className="text-xs leading-0">{tag.name}</span>
            </div>
          ))}
        </div>
      </div>
      <ExternalLinkIcon className="w-full max-w-[20px] ml-auto md:block ml-8 text-gray-500 hidden" />
    </a>
  );
}

const StuffPage: CustomPage = ({
  stuff,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const uniqueTags = [
    ...new Set(stuff.flatMap((item) => item.tags.flatMap((tag) => tag.name))),
  ];

  const [selectedTags, setSelectedTags] = useState(uniqueTags);

  return (
    <>
      <PageHeader title="Stuff I like">
        <div className="flex md:flex-row flex-col md:items-center mt-4">
          <StuffFilter
            setSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
            availableTags={uniqueTags}
          />
          <span className="md:ml-1 md:mt-[2px] mt-3 md:text-base text-sm">
            Looking for restaurants & bars? Find me on{' '}
            <a
              className="text-brand-500 hover:underline"
              target="_blank"
              href="https://link.stepyourworld.com/d9zCQwksQ8gknzDg9"
            >
              Step
            </a>
          </span>
        </div>
      </PageHeader>
      <div className="min-h-[200px] flex flex-col gap-y-4">
        {stuff
          .filter((item) =>
            Boolean(item.tags.find((tag) => selectedTags.includes(tag.name))),
          )
          .map((item) => (
            <StuffItem {...item} key={item.id} />
          ))}
      </div>
    </>
  );
};

StuffPage.getLayout = (page) => (
  <WebLayout
    title="Stuff"
    ogImage={`${APIRoutes.OG_IMAGE}/${encodeURIComponent('Stuff I like')}`}
    url={`https://andreas.fyi${ROUTES.Stuff.Home}`}
  >
    {page}
  </WebLayout>
);

export async function getStaticProps() {
  return {
    props: {
      stuff: await getAllStuff(),
    },
    revalidate: 1,
  };
}

export default StuffPage;
