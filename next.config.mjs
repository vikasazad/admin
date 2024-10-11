/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    runtime: "edge",
  },
  // Enable SWC minification for improved performance
  swcMinify: true,
  // Disable React's static prerendering to use Edge Runtime
  reactStrictMode: true,
  // Optionally, you can add custom webpack configurations here
  webpack: (config, { isServer }) => {
    // Custom webpack configs if needed
    return config;
  },
};

export default nextConfig;
