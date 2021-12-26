import React, { PropsWithChildren } from 'react';

export function Quote({ children, ...props }: PropsWithChildren<{}>) {
  return (
    <blockquote
      className="px-8 py-3 bg-gray-900 rounded italic relative mb-8 notion-quote ml-[54px]"
      {...props}
    >
      {children}
    </blockquote>
  );
}
