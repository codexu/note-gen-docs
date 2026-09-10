import { createMDX } from 'fumadocs-mdx/next';
const withMDX = createMDX({});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/:lang(cn|en)/docs/plugins/manage',
        destination: '/:lang/docs/plugins',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 's2.loli.net' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com' },
      { protocol: 'https', hostname: 'www.netlify.com' },
      { protocol: 'https', hostname: 'files.seeusercontent.com' },
    ],
  },
};

export default withMDX(config);
