import { Attributes, createElement, forwardRef } from 'react';
import classNames, { Argument } from 'classnames';
import { PropsOf } from './types';

export function classed<
  T extends keyof JSX.IntrinsicElements,
  P extends Record<string, unknown>,
>(type: T, ...className: Argument[]) {
  return forwardRef(
    (props: Attributes & PropsOf<T> & P & { className?: string }, ref) => {
      return createElement(type, {
        ...props,
        className: classNames(props?.className, ...className),
        ref,
      });
    },
  );
}
