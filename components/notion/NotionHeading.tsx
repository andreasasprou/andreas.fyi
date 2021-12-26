import { RichText } from '@notionhq/client/build/src/api-types';
import Link from 'next/link';
import { classed } from '../../shared/classed';
import { JSXElementType } from '../../shared/types';
import { convertHeadingToId } from '../../shared/client/notion';
import { NotionText } from './NotionText';

type HeadingTypes = 'heading_1' | 'heading_2' | 'heading_3';
interface HeadingConfig {
  classes: string;
  as: JSXElementType;
}

const headingConfig: Record<HeadingTypes, HeadingConfig> = {
  heading_1: {
    classes: 'text-4xl font-bold leading-snug mt-16 mb-4 text-white/90',
    as: 'h1',
  },
  heading_2: {
    classes: 'text-3xl font-bold mt-12 mb-4 text-white/90',
    as: 'h2',
  },
  heading_3: {
    classes: 'text-2xl font-bold mt-8 mb-2 text-white/90',
    as: 'h3',
  },
};

const commonClasses = [
  'leading-normal cursor-pointer hover:underline notion-h',
];

interface Props {
  type: HeadingTypes;
  text: RichText[];
}
export function NotionHeading({ type, text }: Props) {
  const id = convertHeadingToId(text[0].plain_text);
  const config = headingConfig[type];

  if (!config) {
    return <></>;
  }

  const Component = classed(config.as, [...commonClasses, config.classes]);

  return (
    <Link href={`#${id}`} passHref>
      <Component data-id={id} id={id}>
        <NotionText text={text} />
      </Component>
    </Link>
  );
}
