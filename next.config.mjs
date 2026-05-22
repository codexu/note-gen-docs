import { createMDX } from 'fumadocs-mdx/next';
const withMDX = createMDX({});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["s2.loli.net", "avatars.githubusercontent.com", "www.netlify.com"],
  },
};

export default withMDX(config);
