import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';

export const Code = ({
  children,
  language = 'javascript',
}: {
  language: string;
  children: string;
}) => {
  return (
    <>
      <pre className="text-sm md:text-base bg-gray-900 p-2 md:p-4 mb-4 md:mb-8 overflow-x-auto">
        <code
          dangerouslySetInnerHTML={{
            __html: Prism.highlight(
              children,
              Prism.languages[language.toLowerCase()] ||
                Prism.languages.javascript,
              language.toLowerCase(),
            ),
          }}
        />
      </pre>
    </>
  );
};
