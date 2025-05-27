import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // Add other Next.js configurations if needed
  };
   
export default withNextIntl(nextConfig);