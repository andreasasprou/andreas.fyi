import { Block } from '@notion-stuff/v4-types';
import { HeadingBlock } from '@notion-stuff/v4-types/src/lib/types';

const getIndentLevel = (tag: HeadingBlock['type']) => {
  switch (tag) {
    case 'heading_1':
      return 1;
    case 'heading_2':
      return 2;
    case 'heading_3':
      return 3;
  }

  return 1;
};

export const generateToc = async (blocks: Block[]) =>
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
