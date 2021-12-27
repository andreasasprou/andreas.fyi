import { formatListBlocks } from './format-list-blocks';

describe(formatListBlocks, () => {
  it('should wrap li blocks with ul block', () => {
    expect(formatListBlocks([])).toMatchObject([]);
  });
});
