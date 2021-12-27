import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { PropertyValueTitle, PropertyValueUrl } from '@notion-stuff/v4-types';
import {
  PropertyValueEditedTime,
  PropertyValueMultiSelect,
} from '@notion-stuff/v4-types/src/lib/types';
import { NotionStuffItem } from '../../types';
import { notion } from './notion';

interface Properties {
  name: PropertyValueTitle;
  url: PropertyValueUrl;
  tags: PropertyValueMultiSelect;
  notes: PropertyValueEditedTime;
}

export function formatProperties(
  id: string,
  properties: Properties,
): NotionStuffItem {
  return Object.entries(properties).reduce(
    (acc, [prop, value]) => {
      const baseValue = value?.[value?.type];

      if (!baseValue) {
        return acc;
      }

      return {
        ...acc,
        [prop]:
          baseValue[0]?.plain_text ?? baseValue[0]?.rich_tech ?? baseValue,
      };
    },
    { id } as NotionStuffItem,
  );
}

const fetchStuff = async (cursor?: string | undefined) => {
  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: '54225fb54444450eb6e5c50da56fae0d',
    page_size: 50,
    start_cursor: cursor ? cursor : undefined,
    filter: {
      and: [
        {
          property: 'url',
          url: {
            is_not_empty: true,
          },
        },
      ],
    },
  });

  return {
    data: response.results.map((item) =>
      formatProperties(item.id, (item as any).properties),
    ),
    next_cursor: response.next_cursor,
    has_more: response.has_more,
  };
};

export async function getAllStuff() {
  const posts: NotionStuffItem[] = [];
  let cursor = undefined;

  do {
    const response = await fetchStuff(cursor);

    posts.push(...response.data);

    cursor = response.next_cursor as string;
  } while (cursor);

  return posts;
}
