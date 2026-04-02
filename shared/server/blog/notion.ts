import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { Block } from '@notion-stuff/v4-types';
import { NotionBlogPostSummary } from '../../types';
import { ClientConstants } from '../../constants/client';
import { generateToc } from './generate-toc';
import { formatPostProperties } from './format-post-properties';
import { appendListBlocks } from './format-list-blocks';
import { getMarkdownPosts, getMarkdownPostBySlug } from './markdown';

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
        ClientConstants.isProd
          ? {
              property: 'status',
              select: {
                equals: 'Published',
              },
            }
          : {
              or: [
                {
                  property: 'status',
                  select: {
                    equals: 'Published',
                  },
                },
                {
                  property: 'status',
                  select: {
                    equals: 'Draft',
                  },
                },
              ],
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

  if (post.results.length > 1) {
    throw new Error('Multiple posts match with this slug.');
  }

  if (post.results.length === 0) {
    throw new Error('Cannot find post with this slug');
  }

  const pageId = post.results[0]!.id;

  const pagePromise = notion.pages.retrieve({ page_id: pageId });
  const blocksPromise = fetchAllChildrenBlocks(pageId);

  const page = await pagePromise;
  const blocks = await blocksPromise;

  return {
    pageInfo: formatPostProperties((page as any).properties),
    blocks: appendListBlocks(blocks),
    toc: generateToc(blocks),
  };
};

export const getPostById = async (postId: string) => {
  const post = await notion.pages.retrieve({ page_id: postId });
  const blocks = await notion.blocks.children.list({ block_id: postId });

  return { pageInfo: post, blocks: blocks.results };
};

// --- Combined sources (Notion + local markdown) ---

export async function getAllPostsCombined(): Promise<NotionBlogPostSummary[]> {
  const [notionPosts, markdownPosts] = await Promise.all([
    getAllPosts(),
    Promise.resolve(getMarkdownPosts()),
  ]);

  return [...notionPosts, ...markdownPosts].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() -
      new Date(a.publishedDate).getTime(),
  );
}

export async function getPostBySlugCombined(slug: string) {
  // Check markdown first (fast, no network)
  const mdPost = getMarkdownPostBySlug(slug);
  if (mdPost) {
    return { source: 'markdown' as const, ...mdPost };
  }

  const notionPost = await getPostBySlug(slug);
  return { source: 'notion' as const, ...notionPost };
}

export async function getPostsCombined(cursor?: string) {
  const notionResponse = await getPosts(cursor);
  // Only merge markdown posts on the first page (no cursor)
  if (!cursor) {
    const markdownPosts = getMarkdownPosts();
    const combined = [...notionResponse.data, ...markdownPosts].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    );
    return { ...notionResponse, data: combined };
  }
  return notionResponse;
}
