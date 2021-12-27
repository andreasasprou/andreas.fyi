import Link from 'next/link';
import { classed } from 'shared/classed';
import { JSXElementType } from 'shared/types';
import { convertHeadingToId } from 'shared/client/notion';
import { HeadingBlock, RichText } from '@notion-stuff/v4-types/src/lib/types';
import { NotionText } from './NotionText';

interface HeadingConfig {
  classes: string;
  as: JSXElementType;
}

const headingConfig: Record<HeadingBlock['type'], HeadingConfig> = {
  heading_1: {
    classes:
      'first-child:mt-0 text-2xl md:text-4xl font-bold leading-snug mt-8 md:mt-16 mb-2 md:mb-4 text-white/90',
    as: 'h1',
  },
  heading_2: {
    classes:
      'text-xl md:text-3xl font-bold mt-6 md:mt-12 mb-2 md:mb-4 text-white/90',
    as: 'h2',
  },
  heading_3: {
    classes:
      'text-lg md:text-2xl font-bold mt-4 md:mt-8 mb-1 md:mb-2 text-white/90',
    as: 'h3',
  },
};

const commonClasses = [
  'leading-normal cursor-pointer hover:underline notion-h',
];

interface Props {
  type: HeadingBlock['type'];
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
        <NotionText block={text} />
      </Component>
    </Link>
  );
}
