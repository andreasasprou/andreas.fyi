import { IncomingMessage } from 'http';
import { parse } from 'url';
import { APIRoutes } from '../../constants/client';
import { ParsedRequest } from './types';

const BASE_URL = `${APIRoutes.OG_IMAGE}/`;

export function parseRequest(req: IncomingMessage) {
  console.log('HTTP ' + req.url);
  const { pathname, query } = parse(req.url || '/', true);
  const { md } = query || {};

  const arr = (pathname ?? '').replace(BASE_URL, '').split('.');
  let extension = '';
  let text = '';
  if (arr.length === 0) {
    text = '';
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join('.');
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === 'jpeg' ? extension : 'png',
    text: decodeURIComponent(text),
    md: md === '1' || md === 'true',
  };

  return parsedRequest;
}
