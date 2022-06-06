import dayjs from 'dayjs';
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { StyleProps } from '../shared/types';

interface PageHeaderProps extends StyleProps {
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
  className,
}: PageHeaderProps) {
  return (
    <div
      className={classNames(
        'border-b border-b-white/20 pb-4 mb-4 md:pb-8 md:mb-8',
        className,
      )}
    >
      <div>
        <h1 className="md:text-6xl text-3xl font-bold text-white/90 leading-normal md:leading-[1.15] max-w-[1000px]">
          {title}
        </h1>
        {subTitle && (
          <p className="mt-3 md:mt-6 text-xl text-white/80 leading-normal max-w-[1000px]">
            {subTitle}
          </p>
        )}
        {createdAt && (
          <p className="text-white/70 mt-4">
            {dayjs(createdAt).format('MMM D, YYYY')}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
