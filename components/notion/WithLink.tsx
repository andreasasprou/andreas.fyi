import { cloneElement, useMemo } from 'react';
import NLink from 'next/link';

export interface Props {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

const isExternalLink = (href: string) =>
  href == null || href.startsWith('http://') || href.startsWith('https://');

const useIsExternalLink = (href: string) =>
  useMemo(() => isExternalLink(href), [href]);

const WithLink = ({ href, external, children, ...props }: Props) => {
  const isExternal = (useIsExternalLink(href) || external) ?? false;

  if (isExternal) {
    return <>{cloneElement(children, {})}</>;
  }

  return (
    <NLink href={href} passHref>
      <a {...props}>{children}</a>
    </NLink>
  );
};

export default WithLink;
