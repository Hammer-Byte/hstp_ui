/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "https://dev-hstp.hammerbyte.co.in/api"}/:path*`,
      },
    ];
  },
};

export default nextConfig;
