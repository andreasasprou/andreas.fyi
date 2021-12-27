import { Dispatch, SetStateAction, useCallback, useState } from 'react';

interface Actions {
  on: () => void;
  off: () => void;
  toggle: () => void;
}

export function useBoolean(defaultValue?: boolean): [boolean, Actions] {
  const [value, setValue] = useState(!!defaultValue);

  const on = useCallback(() => setValue(true), []);
  const off = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((x) => !x), []);

  return [value, { on, off, toggle }];
}
