import {
  FileWithCaption,
  ExternalFileWithCaption,
} from '@notion-stuff/v4-types';

export const getMediaProperties = (
  value: FileWithCaption | ExternalFileWithCaption,
) => {
  const source =
    value.type === 'external' ? value.external.url : value.file.url;
  const caption =
    value.caption && value.caption.length > 0
      ? value.caption[0].plain_text
      : '';

  return { source, caption };
};

export const convertHeadingToId = (heading: string) =>
  encodeURIComponent(
    heading.toLowerCase().replace(/\s/g, '-').replace(/[?!:]/g, ''),
  );
