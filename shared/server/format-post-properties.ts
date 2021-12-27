import {
  PropertyValueCreatedTime,
  PropertyValueDate,
  PropertyValueRichText,
  PropertyValueTitle,
} from '@notion-stuff/v4-types';
import { NotionBlogPostSummary } from '../types';

interface PostProperties {
  name: PropertyValueTitle;
  slug: PropertyValueRichText;
  created: PropertyValueCreatedTime;
  publishedDate?: PropertyValueDate;
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
