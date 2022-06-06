import React, { forwardRef, Ref } from 'react';
import classNames from 'classnames';
import { PropsOf } from 'shared/types';

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
