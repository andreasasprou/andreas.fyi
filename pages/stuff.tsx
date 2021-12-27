import React, { useCallback, useState } from 'react';
import { WebLayout } from 'components/layouts/WebLayout';
import { CustomPage, NotionStuffItem } from 'shared/types';
import { InferGetStaticPropsType } from 'next';
import { APIRoutes, ROUTES } from 'shared/constants/client';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import { getAllStuff } from '../shared/server/blog/stuff';
import { PageHeader } from '../components/PageHeader';

function StuffItem({ url, tags, name, notes = '' }: NotionStuffItem) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="flex md:flex-row flex-col md:justify-between md:items-center max-w-article bg-white/10 p-2 md:p-4 hover:cursor-pointer hover:bg-gray-800 transition-all"
    >
      <div>
        <div className="flex items-start md:items-center md:flex-row flex-col md:space-y-0 space-y-1 md:space-x-1">
          <p className="text-brand-500 md:text-lg font-medium md:mr-2 mr-0">
            {name}
          </p>
          {tags.map((tag) => (
            <div className="px-2 bg-gray-700">
              <span className="text-xs leading-0">{tag.name}</span>
            </div>
          ))}
        </div>
        {notes.length > 0 && <p className="text-sm mt-2">{notes}</p>}
      </div>
      <ExternalLinkIcon className="w-full max-w-[20px] ml-auto md:block ml-8 text-gray-500 hidden" />
    </a>
  );
}

interface TagsSelectorProps {
  tags: { isActive: boolean; title: string }[];
  onToggle: (tag: string) => void;
}

function TagsSelector({ tags, onToggle }: TagsSelectorProps) {
  return (
    <div className="flex flex-wrap overflow-x-auto gap-4 mt-6">
      {tags.map(({ title, isActive }) => (
        <button
          key={title}
          className={classNames('px-2 md:px-3 md:py-2 py-1 flex-shrink-0', {
            'bg-brand-500': isActive,
            'text-black': isActive,
            'bg-gray-700': !isActive,
            'text-white': !isActive,
          })}
          onClick={() => onToggle(title)}
        >
          <span className="leading-0">{title}</span>
        </button>
      ))}
    </div>
  );
}

const StuffPage: CustomPage = ({
  stuff,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const uniqueTags = [
    ...new Set(stuff.flatMap((item) => item.tags.flatMap((tag) => tag.name))),
  ];

  const [selectedTags, setSelectedTags] = useState(uniqueTags);

  const onToggle = useCallback((tag: string) => {
    setSelectedTags((oldTags) => {
      if (oldTags.includes(tag)) {
        return oldTags.filter((oldTag) => oldTag !== tag);
      }

      return [...oldTags, tag];
    });
  }, []);

  return (
    <>
      <PageHeader title="Stuff I like">
        <TagsSelector
          tags={uniqueTags.map((tag) => ({
            title: tag,
            isActive: selectedTags.includes(tag),
          }))}
          onToggle={onToggle}
        />
      </PageHeader>
      <div className="flex flex-wrap gap-4">
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
