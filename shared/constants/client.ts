const nodeEnv = process.env.NODE_ENV;

export const ClientConstants = {
  isProd: nodeEnv === 'production',
  baseUrl:
    nodeEnv === 'development' ? 'http://localhost:3000' : 'https://andreas.fyi',
};

export const ROUTES = {
  Home: '/',
  Blog: {
    Home: '/blog',
    post: (name: string) => `/blog/${name}`,
  },
};

export const APIRoutes = {
  OG_IMAGE: '/api/og-image',
  SUBSCRIBE: '/api/subscribe',
};

export const LayoutConstants = {
  textMaxWidth: 800,
  margin: {
    paragraph: {
      base: 2,
      md: 4,
    },
    large: { base: 12, md: 28 },
    small: {
      base: 6,
      md: 12,
    },
  },
};
