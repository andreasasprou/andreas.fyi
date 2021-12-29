import dayjs from 'dayjs';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/solid';
import React from 'react';
import { NotionBlogPostSummary } from '../shared/types';

interface PostSummaryLinkProps extends NotionBlogPostSummary {
  href: string;
}

export function PostSummaryLink({
  href,
  name,
  excerpt,
  publishedDate,
  created,
  estimatedReadingTime,
  tags,
  lastModified,
}: PostSummaryLinkProps) {
  const date = dayjs(new Date(publishedDate ?? created)).format('DD/MM/YYYY');

  return (
    <Link href={href} passHref>
      <div className="max-w-article maxW-[700] hover:cursor-pointer transition-all border border-[#333] hover:border-[#666]">
        <div className="p-4 md:p-6">
          <p className="text-brand-500 md:text-2xl text-xl font-medium mb-3 md:mb-4 leading-normal md:leading-normal">
            {name}
          </p>
          <p className="text-lg">{excerpt}</p>
          <p className="text-sm mt-2 md:mt-3 text-white/70">{date}</p>
          {tags && (
            <div className="flex wrap space-x-2 mt-2 md:mt-4">
              {tags.map((tag) => (
                <p className="text-sm py-1 px-2 border-1 bg-gray-99 border border-[#333] bg-[#111] color-[#888]">
                  {tag}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center px-4 py-2 md:px-6 md:py-4 bg-white/10 border-t-[#333] border-t hover:text-white">
          <p className="">
            Read More{' '}
            {estimatedReadingTime ? `· ${estimatedReadingTime} read` : ''}
          </p>
          <ArrowRightIcon className="w-4 md:w-6 ml-auto" />
        </div>
      </div>
    </Link>
  );
}
