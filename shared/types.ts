import exp from 'constants';
import { Argument } from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';

export type StyleProps = PropsWithChildren<{
  className?: Argument;
}>;

export type CustomPage = {
  getLayout: (page: ReactNode) => ReactNode;
};

export type JSXElementType = keyof JSX.IntrinsicElements;

export type PropsOf<T extends JSXElementType> = JSX.IntrinsicElements[T];

export interface NotionBlogPostSummary {
  name: string;
  excerpt: string;
  created: string;
  slug: string;
}
