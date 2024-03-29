import {
  PropertyValueCreatedTime,
  PropertyValueDate,
  PropertyValueRichText,
  PropertyValueTitle,
  PropertyValue,
} from '@notion-stuff/v4-types';
import {
  PropertyValueEditedTime,
  PropertyValueMultiSelect,
} from '@notion-stuff/v4-types/src/lib/types';
import dayjs from 'dayjs';
import { NotionBlogPostSummary } from '../../types';

interface PostProperties {
  name: PropertyValueTitle;
  slug: PropertyValueRichText;
  created: PropertyValueCreatedTime;
  lastModified: PropertyValueEditedTime;
  publishedDate: PropertyValueDate;
  tags: PropertyValueMultiSelect;
  estimatedReadingTime: PropertyValueRichText;
}

const formatPropertyValue = (value: PropertyValue) => {
  if (!value || !(value as any)?.[value.type]) {
    return undefined;
  }

  switch (value.type) {
    case 'date':
      return dayjs(
        (value as PropertyValueDate).date?.start ?? new Date(),
      ).toISOString();
    case 'rich_text':
      return (value as PropertyValueRichText).rich_text[0].plain_text;
    case 'title':
      return (value as PropertyValueTitle).title[0].plain_text;
    case 'multi_select':
      return (value as PropertyValueMultiSelect).multi_select.map(
        (item) => item.name,
      );
  }

  return (value as any)[value.type];
};

export function formatPostProperties(
  properties: PostProperties,
): NotionBlogPostSummary {
  const formattedProperties = Object.entries(properties).reduce(
    (acc, [prop, value]) => {
      const propertyValue = formatPropertyValue(value);

      if (!propertyValue) {
        return acc;
      }

      return {
        ...acc,
        [prop]: propertyValue,
      };
    },
    {} as NotionBlogPostSummary,
  ) as NotionBlogPostSummary;

  return {
    ...formattedProperties,
    publishedDate:
      formattedProperties.publishedDate ?? formattedProperties.created,
  };
}
