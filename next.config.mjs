/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "www.mrporter.com",
      "img.icons8.com",
      "lh3.googleusercontent.com",
      "cdn.sanity.io",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  rules: {
    "react/no-unescaped-entities": "off",
  },
};

export default nextConfig;
