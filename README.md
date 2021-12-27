## Features


## Running Locally

1. Clone and install deps

```bash
git clone hhttps://github.com/andreasasprou/andreas.fyi.git
cd andreas.fyi
yarn
```

2. Populate your `.env.local` file

```.env
NOTION_SECRET=""
NOTION_DATABASE_ID=""
MAILCHIMP_API_KEY=""
MAILCHIMP_LIST_ID=""
```

3Start the dev server

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Stack

- Official Notion API as headless CMS
- Tailwind for styles
- Next 12
- Newsletter subscribe via Mailchimp

## Features

### Dynamic open graph image generator for each blog post

```typescript
const blogPostName = 'My Blog Post';

const url = `https://andreas.fyi/api/og-image/${encodeURIComponent(
blogPostName,
)}.jpeg`;

<meta property="og:image" content={url}>
```

[Link to commit implementing this feature](https://github.com/andreasasprou/andreas.fyi/commit/49d371bc156ecaab26ccb6566292ec92803cb841)

### Dynamic Sitemap

``pages/sitemap.xml.tsx``