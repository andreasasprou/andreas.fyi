import { ReactNode, useMemo } from 'react';
import NLink from 'next/link';
import classNames from 'classnames';
import { pageLinkClasses } from '../PageLink';

export interface Props {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}

const isExternalLink = (href: string) =>
  href == null || href.startsWith('http://') || href.startsWith('https://');

const useIsExternalLink = (href: string) =>
  useMemo(() => isExternalLink(href), [href]);

export const Link = ({
  href,
  external,
  children,
  className,
  ...props
}: Props) => {
  const isExternal = (useIsExternalLink(href) || external) ?? false;

  const linkClassName = classNames(className, pageLinkClasses);

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={linkClassName}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NLink href={href} passHref>
      <a className={linkClassName} {...props}>
        {children}
      </a>
    </NLink>
  );
};
