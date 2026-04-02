import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { NotionBlogPostSummary, TableOfContentsEntry } from '../../types';

const contentDir = path.join(process.cwd(), 'content', 'writing');

function convertHeadingToId(heading: string) {
  return encodeURIComponent(
    heading.toLowerCase().replace(/\s/g, '-').replace(/[?!:]/g, ''),
  );
}

const renderer = new marked.Renderer();
renderer.heading = (text: string, level: number) => {
  const id = convertHeadingToId(text);
  const tag = `h${level}`;
  return `<${tag} id="${id}" data-id="${id}" class="notion-h">${text}</${tag}>`;
};

interface MarkdownFrontmatter {
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  tags?: string[];
  estimatedReadingTime?: string;
}

export function getMarkdownPosts(): NotionBlogPostSummary[] {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data } = matter(raw);
      const fm = data as MarkdownFrontmatter;

      return {
        name: fm.title,
        excerpt: fm.excerpt ?? '',
        created: fm.publishedDate,
        publishedDate: fm.publishedDate,
        slug: fm.slug,
        lastModified: fm.publishedDate,
        tags: fm.tags,
        estimatedReadingTime: fm.estimatedReadingTime,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    );
}

export function getMarkdownPostBySlug(slug: string) {
  if (!fs.existsSync(contentDir)) return null;

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data, content } = matter(raw);
    const fm = data as MarkdownFrontmatter;

    if (fm.slug !== slug) continue;

    const html = marked(content, { renderer }) as string;
    const toc = extractToc(content);

    return {
      pageInfo: {
        name: fm.title,
        excerpt: fm.excerpt ?? '',
        created: fm.publishedDate,
        publishedDate: fm.publishedDate,
        slug: fm.slug,
        lastModified: fm.publishedDate,
        tags: fm.tags,
        estimatedReadingTime: fm.estimatedReadingTime,
      } as NotionBlogPostSummary,
      html,
      toc,
    };
  }

  return null;
}

function extractToc(markdown: string): TableOfContentsEntry[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const entries: TableOfContentsEntry[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    // Skip h1 (the title)
    if (level === 1) continue;

    const indentLevel = (level - 1) as 0 | 1 | 2;
    const type =
      level === 1
        ? 'heading_1'
        : level === 2
          ? 'heading_2'
          : ('heading_3' as TableOfContentsEntry['type']);

    entries.push({
      title: match[2],
      type,
      indentLevel,
    });
  }

  return entries;
}
