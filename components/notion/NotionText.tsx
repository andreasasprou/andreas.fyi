import { Fragment } from 'react';
import { RichText } from '@notion-stuff/v4-types/src/lib/types';
import { Link } from './Link';

const renderContent = (code: boolean, content: string) => {
  return <>{code ? <code>{content}</code> : <>{content}</>}</>;
};

interface NotionTextProps {
  block: RichText[];
}

export function NotionText({ block }: NotionTextProps) {
  if (block == null) {
    return null;
  }

  return (
    <>
      {block.map((value, idx) => {
        const {
          annotations: { bold, code, italic, strikethrough, underline },
        } = value;

        // TODO: Wrangle Notions' types
        const text: any = (value as any).text;

        if (text == null) {
          return null;
        }

        let classes = '';
        if (bold) classes += 'font-semibold text-white/80';
        if (italic) classes += ' italic';
        if (strikethrough) classes += ' line-through';
        if (underline) classes += ' underline';
        if (code) classes += ' text-brand-500 bg-gray-900 p-[2px]';

        return (
          <Fragment key={idx}>
            {text.link ? (
              <Link href={text.link.url} className={classes}>
                {renderContent(code, text.content)}
              </Link>
            ) : (
              <span className={classes}>
                {renderContent(code, text.content)}
              </span>
            )}
          </Fragment>
        );
      })}
    </>
  );
}
