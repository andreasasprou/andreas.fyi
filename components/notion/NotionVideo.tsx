import React from 'react';
import { VideoBlock } from '@notion-stuff/v4-types';
import { getMediaProperties } from '../../shared/client/notion';

interface NotionVideoProps {
  block: VideoBlock;
}

// //www.loom.com/share/3d0b326f650749bbb1fa13895dcd6563
const loomRegexes = [/https?:\/\/www\.loom\.com\/share\/([a-z0-9]+)/];

const getLoomId = (url = '') =>
  loomRegexes
    .map((regex) => {
      const [, id] = url.match(regex) || [];
      return id;
    })
    .filter((id) => id)[0];

export function NotionVideo({ block }: NotionVideoProps) {
  const { source, caption } = getMediaProperties(block.video);

  let content = <video src={source} controls autoPlay loop muted />;

  const loomId = getLoomId(source);

  if (loomId) {
    content = (
      <div className="relative pb-[62.5%] h-[0]">
        <iframe
          src={`https://www.loom.com/embed/${loomId}`}
          frameBorder="0"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          title={caption ?? source}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col my-8 space-y-2 max-w-[700px] mx-auto">
      {content}
      {caption && <p className="text-gray-500 text-[16px]">{caption}</p>}
    </div>
  );
}
