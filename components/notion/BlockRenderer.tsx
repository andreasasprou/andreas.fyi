import { getMediaProperties } from 'shared/client/notion';
import { ClientConstants } from 'shared/constants/client';
import {
  NotionBlock,
  NotionBulletedListBlock,
  NotionListBlock,
  NotionNumberedListBlock,
} from 'shared/types';
import classNames from 'classnames';
import { classed } from '../../shared/classed';
import { NotionText } from './NotionText';
import { NotionImage } from './NotionImage';
import { NotionHeading } from './NotionHeading';
import { Code } from './Code';
import { Quote } from './Quote';
import { Tweet } from './Tweet';
import { NotionVideo } from './NotionVideo';

interface Props {
  block: NotionBlock;
}

export function BlockRenderer({ block }: Props) {
  const { type } = block;
  const value = (block as any)[type];

  if (value.text != null && value.text.length === 0) {
    return <div className="h-[30px]" />;
  }

  switch (type) {
    case 'paragraph': {
      return (
        <p className="leading-extra-relaxed mb-4 md:mb-8">
          <NotionText block={value.text} />
        </p>
      );
    }
    case 'heading_1':
    case 'heading_2':
    case 'heading_3': {
      return <NotionHeading type={type} text={value.text} />;
    }

    case 'quote': {
      return (
        <Quote>
          <NotionText block={value.text} />
        </Quote>
      );
    }

    case 'callout': {
      return (
        <div className="flex w-full p-4 border border-transparent bg-gray-900 mb-4 md:mb-8">
          {value.icon.emoji && (
            <div className="text-yellow-500">{value.icon.emoji}</div>
          )}
          <div className="ml-4 text-white/90">
            <NotionText block={value.text} />
          </div>
        </div>
      );
    }

    case 'bulleted_list':
      return (
        <ul className="notion-list-item list-disc pl-6">
          {(block as NotionBulletedListBlock).bulleted_list.children.map(
            (listItemBlock) => (
              <BlockRenderer key={listItemBlock.id} block={listItemBlock} />
            ),
          )}
        </ul>
      );

    case 'numbered_list':
      return (
        <ol className="notion-list-item list-decimal pl-6">
          {(block as NotionNumberedListBlock).numbered_list.children.map(
            (listItemBlock) => (
              <BlockRenderer key={listItemBlock.id} block={listItemBlock} />
            ),
          )}
        </ol>
      );

    case 'bulleted_list_item':
    case 'numbered_list_item': {
      return (
        <li className="notion-list-item list-disc">
          <NotionText block={value.text} />
        </li>
      );
    }

    case 'image': {
      const { source, caption } = getMediaProperties(value);
      return (
        <div className="flex flex-col my-8 space-y-2">
          <NotionImage src={source} alt={caption} />
          {caption && <p className="text-gray-500 text-sm">{caption}</p>}
        </div>
      );
    }

    case 'code': {
      return <Code language={value.language}>{value.text[0].plain_text}</Code>;
    }

    case 'divider': {
      return <hr />;
    }

    case 'video': {
      return <NotionVideo block={block} />;
    }

    case 'embed': {
      const embedUrl = (block as any)?.embed?.url ?? '';
      const isTweet = embedUrl?.includes('twitter.com');

      if (isTweet) {
        return <Tweet href={embedUrl} />;
      }

      return <></>;
    }

    case 'table_of_contents':
      return <></>;

    default: {
      return ClientConstants.isProd ? (
        <></>
      ) : (
        <p>
          ❌ Unsupported block{' '}
          {type === 'unsupported' ? 'unsupported by Notion API' : type})
        </p>
      );
    }
  }
}
