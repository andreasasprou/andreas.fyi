import { Readable } from 'stream';

import { SitemapStream, streamToPromise, SitemapItemLoose } from 'sitemap';
import { GetServerSideProps } from 'next';
import { getAllPosts } from '../shared/server/notion';
import { ROUTES } from '../shared/constants/client';

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const links: SitemapItemLoose[] = [
    { url: ROUTES.Blog.Home, priority: 1 },
    { url: ROUTES.Home, priority: 1 },
  ];

  (await getAllPosts()).forEach((post) => {
    links.push({
      url: ROUTES.Blog.post(post.slug),
      lastmodISO: new Date(post.lastModified).toISOString(),
    });
  });

  const stream = new SitemapStream({ hostname: 'https://andreas.fyi' });

  const sitemap = await streamToPromise(Readable.from(links).pipe(stream)).then(
    (data) => data.toString(),
  );

  res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
