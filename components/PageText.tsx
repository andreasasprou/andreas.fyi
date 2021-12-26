import React, { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import { PropsOf } from 'shared/types';

const baseTextClasses = 'text-sm lg:text-lg';

export const PageText = forwardRef(
  ({ className, ...rest }: PropsOf<'p'>, ref: Ref<HTMLParagraphElement>) => {
    return (
      <p
        ref={ref}
        className={classNames(baseTextClasses, className)}
        {...rest}
      />
    );
  },
);

export function PageTextHighlight({ className, ...rest }: PropsOf<'span'>) {
  return (
    <span
      className={classNames(baseTextClasses, 'text-brand-500', className)}
      {...rest}
    />
  );
}

export const LargeText = forwardRef(
  ({ className, ...rest }: PropsOf<'p'>, ref: Ref<HTMLParagraphElement>) => {
    return (
      <p
        ref={ref}
        className={classNames(
          'text-2xl md:text-3xl md:leading-normal leading-normal text-white/90',
          className,
        )}
        {...rest}
      />
    );
  },
);
