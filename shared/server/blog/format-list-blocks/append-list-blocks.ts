import { v4 as uuidv4 } from 'uuid';
import {
  NotionBlock,
  NotionBulletedListBlock,
  NotionListBlock,
  NotionNumberedListBlock,
} from '../../../types';

const isListItem = (type: NotionBlock['type']) =>
  ['bulleted_list_item', 'numbered_list_item'].includes(type);

const createEmptyListBlock = (type: NotionBlock['type']): NotionListBlock => {
  if (type === 'numbered_list_item') {
    return {
      id: uuidv4(),
      type: 'numbered_list',
      numbered_list: {
        children: [],
      } as NotionNumberedListBlock['numbered_list'],
    };
  }

  return {
    id: uuidv4(),
    type: 'bulleted_list',
    bulleted_list: {
      children: [],
    } as NotionBulletedListBlock['bulleted_list'],
  };
};

// Notion have "bulleted_list_item" and "numbered_list_item", but don't have a block for the wrapper
// This makes it difficult to render a <ul> or <ol> when rendering the blocks. This function aims to
// wrap all list_item blocks with their relevant parent
export function appendListBlocks(blocks: NotionBlock[]) {
  const finalBlocks: NotionBlock[] = [];

  let listBlock: NotionListBlock | undefined;

  const finaliseListBlock = () => {
    finalBlocks.push(listBlock!);
    listBlock = undefined;
  };

  const pushChild = (child: NotionBlock) => {
    if (child.type === 'numbered_list_item') {
      (listBlock as NotionNumberedListBlock).numbered_list.children.push(
        child as NotionNumberedListBlock['numbered_list']['children'][number],
      );
    } else {
      (listBlock as NotionBulletedListBlock).bulleted_list.children.push(
        child as NotionBulletedListBlock['bulleted_list']['children'][number],
      );
    }
  };

  for (const block of blocks) {
    if (isListItem(block.type)) {
      if (!listBlock) {
        listBlock = createEmptyListBlock(block.type);
      }

      pushChild(block);

      continue;
      // Is at the end of list items, let's add the list block we've created
    } else if (listBlock) {
      finaliseListBlock();
    }

    finalBlocks.push(block);
  }

  return finalBlocks;
}
