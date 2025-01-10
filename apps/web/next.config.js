/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  transpilePackages: ["@repo/ui", "@repo/types"],
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
