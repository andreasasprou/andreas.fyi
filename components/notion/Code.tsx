import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';

// export const Code = ({
//                        code,
//                        language = 'javascript',
//                      }: {
//   code: string;
//   language: string;
// }) => {
//   const languageL = language.toLowerCase();
//   const prismLanguage = languages[languageL] || languages.javascript;
//
//   console.log(code);
//
//   return (
//     <pre className="notion-code">
//       <code
//         className={`language-${languageL}`}
//         dangerouslySetInnerHTML={{
//           __html: highlight(code, prismLanguage, language),
//         }}
//       />
//     </pre>
//   );
// };

export const Code = ({
  children,
  language = 'javascript',
}: {
  language: string;
  children: string;
}) => {
  return (
    <>
      <pre className="bg-gray-900 p-2 md:p-4 rounded mb-4 md:mb-8 overflow-x-auto">
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
