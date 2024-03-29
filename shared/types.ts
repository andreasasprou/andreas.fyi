import exp from 'constants';
import { Argument } from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';
import {
  Block,
  BulletedListItemBlock,
  NumberedListItemBlock,
} from '@notion-stuff/v4-types';
import { HeadingBlock } from '@notion-stuff/v4-types/src/lib/types';

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
  publishedDate: string;
  slug: string;
  lastModified: string;
  tags?: string[];
  estimatedReadingTime?: string;
}

export interface NotionStuffItem {
  id: string;
  name: string;
  notes?: string;
  url: string;
  tags: {
    id: string;
    name: string;
    color: string;
  }[];
}

export interface TableOfContentsEntry {
  title: string;
  type: HeadingBlock['type'];
  indentLevel: 0 | 1 | 2;
}

export interface NotionNumberedListBlock {
  id: string;
  type: 'numbered_list';
  numbered_list: {
    children: NumberedListItemBlock[];
  };
}

export interface NotionBulletedListBlock {
  id: string;
  type: 'bulleted_list';
  bulleted_list: {
    children: BulletedListItemBlock[];
  };
}

export type NotionListBlock = NotionBulletedListBlock | NotionNumberedListBlock;

export type NotionBlock = Block | NotionListBlock;
