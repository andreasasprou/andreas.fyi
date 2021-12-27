import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { Block } from '@notion-stuff/v4-types';
import { NotionBlogPostSummary } from '../../types';
import { generateToc } from './generate-toc';
import { formatPostProperties } from './format-post-properties';
import { appendListBlocks } from './format-list-blocks';

export const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databaseId = String(process.env.NOTION_DATABASE_ID);

export const getPosts = async (cursor?: string | undefined) => {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: databaseId,
    page_size: 10,
    start_cursor: cursor ? cursor : undefined,
    filter: {
      and: [
        {
          property: 'status',
          select: {
            equals: 'Published',
          },
        },
        {
          property: 'slug',
          rich_text: {
            is_not_empty: true,
          },
        },
      ],
    },
  });

  return {
    data: response.results
      .map((item) => formatPostProperties((item as any).properties))
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      ),
    next_cursor: response.next_cursor,
    has_more: response.has_more,
  };
};

export async function getAllPosts() {
  const posts: NotionBlogPostSummary[] = [];
  let cursor = undefined;

  do {
    const response = await getPosts(cursor);

    posts.push(...response.data);

    cursor = response.next_cursor as string;
  } while (cursor);

  return posts;
}

async function fetchAllChildrenBlocks(blockId: string) {
  const blocks: Block[] = [];
  let cursor = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 50,
    });

    blocks.push(...(response.results as Block[]));

    cursor = response.next_cursor as string;
  } while (cursor);

  return blocks;
}

export const getPostBySlug = async (slug: string) => {
  const post = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or: [
        {
          property: 'slug',
          text: {
            equals: slug,
          },
        },
      ],
    },
  });

  const pageId = post.results[0]!.id;

  const pagePromise = notion.pages.retrieve({ page_id: pageId });
  const blocksPromise = fetchAllChildrenBlocks(pageId);

  const page = await pagePromise;
  const blocks = await blocksPromise;

  return {
    pageInfo: formatPostProperties((page as any).properties),
    blocks: appendListBlocks(blocks),
    toc: await generateToc(blocks),
  };
};

export const getPostById = async (postId: string) => {
  const post = await notion.pages.retrieve({ page_id: postId });
  const blocks = await notion.blocks.children.list({ block_id: postId });

  return { pageInfo: post, blocks: blocks.results };
};
