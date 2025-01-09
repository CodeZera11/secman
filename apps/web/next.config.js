/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // domain: "avatars.githubusercontent.com",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
