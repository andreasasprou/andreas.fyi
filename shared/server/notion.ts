import { Client } from '@notionhq/client';
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionBlogPostSummary } from 'shared/types';

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const databaseId = 'ca29d63f09454ecfa75f1a864345dd6b';

interface PostProperties {
  name: {
    id: 'title';
    title: {
      plain_text: string;
    }[];
  };
  slug: {
    id: 'title';
    rich_text: {
      plain_text: string;
    }[];
  };
  created: {
    created_time: string;
  };
}

export function formatPostProperties(
  properties: PostProperties,
): NotionBlogPostSummary {
  return Object.entries(properties).reduce((acc, [prop, value]) => {
    const baseValue = value?.[value?.type];

    if (!baseValue) {
      return acc;
    }

    return {
      ...acc,
      [prop.toLowerCase()]:
        baseValue[0]?.plain_text ?? baseValue[0]?.rich_tech ?? baseValue,
    };
  }, {} as NotionBlogPostSummary);
}

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
    data: response.results.map((item) =>
      formatPostProperties((item as any).properties),
    ),
    next_cursor: response.next_cursor,
    has_more: response.has_more,
  };
};

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
  const blocksPromise = notion.blocks.children.list({ block_id: pageId });

  const page = await pagePromise;
  const blocks = await blocksPromise;

  return {
    pageInfo: formatPostProperties((page as any).properties),
    blocks: blocks.results,
  };
};

export const getPostById = async (postId: string) => {
  const post = await notion.pages.retrieve({ page_id: postId });
  const blocks = await notion.blocks.children.list({ block_id: postId });

  return { pageInfo: post, blocks: blocks.results };
};
