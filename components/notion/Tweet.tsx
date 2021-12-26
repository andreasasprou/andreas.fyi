import TweetEmbed from 'react-tweet-embed';
import React from 'react';

export const Tweet = ({ href }: { href: string }) => {
  const id = href.split('?')[0].split('/').pop()!;

  return (
    <div className="max-w-[420px] w-full mx-auto mb-4 md:mb-8">
      <TweetEmbed
        id={id}
        options={{
          theme: 'dark',
        }}
      />
    </div>
  );
};
