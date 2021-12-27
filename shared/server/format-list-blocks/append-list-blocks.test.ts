import { appendListBlocks } from './append-list-blocks';
import { AppendListBlocksFixtures } from './append-list-blocks.fixtures';

jest.mock('uuid', () => ({
  ...jest.requireActual('uuid'),
  v4: jest.fn().mockReturnValue('id'),
}));

describe(appendListBlocks, () => {
  it('should wrap li blocks with ul block', () => {
    expect(appendListBlocks(AppendListBlocksFixtures)).toMatchSnapshot();
  });
});
