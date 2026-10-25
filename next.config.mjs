/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/index.html',
        destination: '/',
      },
      {
        source: '/news-blogs.html',
        destination: '/news',
      },
      {
        source: '/support.html',
        destination: '/support',
      },
      {
        source: '/terms-services.html',
        destination: '/terms',
      },
      {
        source: '/privacy-policy.html',
        destination: '/privacy',
      },
    ];
  },
};

export default nextConfig;
