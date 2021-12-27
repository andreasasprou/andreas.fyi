import { IncomingMessage, ServerResponse } from 'http';
import { parseRequest } from './parser';
import { getScreenshot } from './chromium';
import { getHtml } from './template';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

export async function ogGeneratorHandler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const parsedReq = parseRequest(req);
    const html = getHtml(parsedReq);
    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html');
      res.end(html);
      return;
    }
    const { fileType } = parsedReq;
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileType}`);
    res.setHeader(
      'Cache-Control',
      `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
    );
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<div></div>');
    console.error(e);
  }
}
