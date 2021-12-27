import React, { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import { TableOfContentsEntry } from 'shared/types';
import classNames from 'classnames';
import Link from 'next/link';
import { convertHeadingToId } from 'shared/client/notion';

interface TableOfContentsProps {
  toc: TableOfContentsEntry[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const throttleMs = 100;

  // this scrollspy logic was originally based on
  // https://github.com/Purii/react-use-scrollspy
  const actionSectionScrollSpy = throttle(() => {
    const sections = document.getElementsByClassName('notion-h');

    let prevBBox: DOMRect | null = null;
    let currentSectionId: string | null = activeSection;

    for (let i = 0; i < sections.length; ++i) {
      const section = sections[i];
      if (!section || !(section instanceof Element)) continue;

      if (!currentSectionId) {
        currentSectionId = section.getAttribute('data-id');
      }

      const bbox = section.getBoundingClientRect();
      const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0;
      const offset = Math.max(150, prevHeight / 4);

      // GetBoundingClientRect returns values relative to viewport
      if (bbox.top - offset < 0) {
        currentSectionId = section.getAttribute('data-id');

        prevBBox = bbox;
        continue;
      }

      // No need to continue loop, if last element has been detected
      break;
    }

    const currentSection = Array.from(sections).find(
      (section) => section.getAttribute('data-id') === currentSectionId,
    );

    if (currentSection) {
      Array.from(sections).forEach((section) => {
        if (section.getAttribute('data-active') === 'true') {
          section.setAttribute('data-active', 'false');
        }
      });

      currentSection.setAttribute('data-active', 'true');
    }

    setActiveSection(currentSectionId);
  }, throttleMs);

  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy);

    actionSectionScrollSpy();

    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`overflow-y-auto max-h-[100vh] sticky top-4 pb-8 max-w-[380px] hidden lg:flex w-full pl-4 text-white self-start`}
    >
      <div className="flex flex-col items-center">
        <nav className="block space-y-2">
          {toc.map((tocItem) => {
            const id = convertHeadingToId(tocItem.title);

            return (
              <Link href={`#${id}`} passHref key={id}>
                <a
                  className={classNames(
                    `block leading-normal hover:bg-brand-500 hover:text-black px-1 text-base`,
                    {
                      'text-brand-500': activeSection === id,
                      'text-white/80': activeSection !== id,
                      'mt-[2px]': tocItem.indentLevel === 0,
                      'first-of-type:mt-0': tocItem.indentLevel === 0,
                    },
                  )}
                  style={{
                    marginLeft: tocItem.indentLevel * 16,
                  }}
                >
                  {tocItem.title}
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
