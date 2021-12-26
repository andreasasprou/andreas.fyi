import { Fragment } from 'react';
import { Link } from './Link';

/**
 * This type is harcoded here as I couldn't really find anything
 * in the Notion API that corresponds to the actual data
 */
interface TextProps {
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  href?: string;
  plain_text: string;
  text?: {
    content: string;
    link?: {
      url: string;
    };
  };
  type: string;
}

const renderContent = (code: boolean, content: string) => {
  return <>{code ? <code>{content}</code> : <>{content}</>}</>;
};

export const NotionText: React.FC<{ text: TextProps[] | null }> = ({
  text,
}) => {
  if (text == null) {
    return null;
  }

  return (
    <>
      {text.map((value, idx) => {
        const {
          annotations: { bold, code, italic, strikethrough, underline },
          text,
        } = value;
        if (text == null) {
          return null;
        }

        let classes = '';
        if (bold) classes += 'font-semibold text-white/80';
        if (italic) classes += ' italic';
        if (strikethrough) classes += ' line-through';
        if (underline) classes += ' underline';
        if (code)
          classes += ' text-brand-500 bg-gray-900 p-[2px] rounded-[2px]';

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
};
