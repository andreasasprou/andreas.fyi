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

export type TOCType = 'heading_1' | 'heading_2' | 'heading_3';

export interface TableOfContentsEntry {
  title: string;
  type: TOCType;
  indentLevel: number;
}
