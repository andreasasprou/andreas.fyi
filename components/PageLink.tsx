import classNames from 'classnames';
import React from 'react';
import { PropsOf, StyleProps } from '../shared/types';

export const pageLinkClasses = 'px-1 text-black bg-brand-500 hover:opacity-80';

export const PageLink = ({
  className,
  ...props
}: StyleProps & PropsOf<'a'>) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a className={classNames(pageLinkClasses, className)} {...props} />
);
