import { createMDX } from 'fumadocs-mdx/next';
const withMDX = createMDX({});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'standalone',
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
