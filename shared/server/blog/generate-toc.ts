import { Block } from '@notion-stuff/v4-types';
import { HeadingBlock } from '@notion-stuff/v4-types/src/lib/types';
import { TableOfContentsEntry } from '../../types';

const getIndentLevel = (
  tag: HeadingBlock['type'],
): TableOfContentsEntry['indentLevel'] => {
  switch (tag) {
    case 'heading_1':
      return 0;
    case 'heading_2':
      return 1;
    case 'heading_3':
      return 2;
  }

  return 0;
};

export const generateToc = (blocks: Block[]): TableOfContentsEntry[] =>
  blocks
    .filter((block: Block) =>
      ['heading_1', 'heading_2', 'heading_3'].includes(block.type),
    )
    .map((block: Block) => {
      const blockType = block.type as HeadingBlock['type'];

      return {
        type: blockType,
        title: (block as any)[blockType].text[0].plain_text,
        indentLevel: getIndentLevel(blockType),
      };
    });
