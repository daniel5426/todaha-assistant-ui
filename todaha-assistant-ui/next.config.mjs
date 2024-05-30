import nextTranslate from 'next-translate-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    // Add custom webpack configurations here
    return config;
  }
});

export default nextConfig;
