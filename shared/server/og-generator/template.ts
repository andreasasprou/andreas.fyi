import { readFileSync } from 'fs';
import { marked } from 'marked';
import twemoji from 'twemoji';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

let rglr: string;

const readFonts = () => {
  if (rglr) {
    return;
  }

  rglr = readFileSync(
    `${__dirname}/../../../../public/fonts/silka/silka-medium-webfont.woff2`,
  ).toString('base64');
};

function getCss() {
  readFonts();

  const background = '#000000';
  const headingColor = '#F2AA4C';
  const bodyColor = '#ffffff';

  return `
    @font-face {
      font-family: "Silka";
      src: url(data:font/woff2;charset=utf-8;base64,${rglr}) format('woff2');
      font-weight: 400;
      font-style: normal;
    }

    body {
        background: ${background};
        color: ${bodyColor};
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        font-size: 80px;
        font-family: Silka;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .heading {
        color: ${headingColor};
        line-height: 1.3;
        margin-bottom: 20px;
        max-width: 70vw;
    }

    p {
        margin: 0;
    }`;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, md } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div>
            <div class="heading">${emojify(
              md ? marked(text) : sanitizeHtml(text),
            )}
            </div>
            <p>andreas.fyi</p>
        </div>
    </body>
</html>`;
}
