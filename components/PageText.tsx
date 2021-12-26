import { forwardRef, Ref } from 'react';
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
