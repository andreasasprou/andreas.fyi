import dayjs from 'dayjs';
import React, { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  createdAt?: Date;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subTitle,
  createdAt,
  children,
}: PageHeaderProps) {
  return (
    <div className="border-b border-b-white/20 pb-4 mb-4 md:pb-8 md:mb-8 max-w-[1000px]">
      <h1 className="md:text-6xl text-3xl font-bold text-white/90 leading-normal md:leading-[1.15]">
        {title}
      </h1>
      {subTitle && (
        <p className="mt-3 md:mt-6 text-xl text-white/80 leading-normal">
          {subTitle}
        </p>
      )}
      {createdAt && (
        <p className="text-white/70 mt-4">
          {dayjs(createdAt).format('MMM D, YYYY')}
        </p>
      )}
      {children}
    </div>
  );
}
