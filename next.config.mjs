import { createMDX } from 'fumadocs-mdx/next';
import { remarkImage } from 'fumadocs-core/mdx-plugins';

const withMDX = createMDX({
  mdxOptions: {
    remarkPlugins: [remarkImage],
  },
});

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["s2.loli.net", "avatars.githubusercontent.com", "www.netlify.com"],
  },
};

export default withMDX(config);
