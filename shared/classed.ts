import {
  Attributes,
  ClassAttributes,
  createElement,
  ElementType,
  FunctionComponentElement,
  ReactElement,
} from 'react';
import classNames, { Argument } from 'classnames';

export function classed<P extends Record<string, unknown>>(
  type: ElementType,
  ...className: Argument[]
): (props?: (Attributes & P) | null) => FunctionComponentElement<P>;

export function classed<
  T extends keyof JSX.IntrinsicElements,
  P extends JSX.IntrinsicElements[T],
>(
  type: keyof JSX.IntrinsicElements,
  ...className: Argument[]
): (props?: (ClassAttributes<T> & P) | null) => ReactElement<P, T>;

export function classed<P extends Record<string, unknown>>(
  type: ElementType | keyof JSX.IntrinsicElements,
  ...className: Argument[]
): (
  props?: (Attributes & P & { className?: string }) | null,
) => ReactElement<P> {
  return function Classed(props) {
    return createElement(type, {
      ...props,
      className: classNames(props?.className, ...className),
    });
  };
}
