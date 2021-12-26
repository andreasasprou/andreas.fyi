import { TOCType } from '../types';

const getIndentLevel = (tag: TOCType) => {
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

export const generateToc = async (blocks: any) => {
  return blocks
    .filter((block) =>
      ['heading_1', 'heading_2', 'heading_3'].includes(block.type),
    )
    .map((block) => ({
      type: block.type,
      title: block[block.type].text[0].plain_text,
      indentLevel: getIndentLevel(block.type),
    }));
};
