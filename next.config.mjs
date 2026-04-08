const nextConfig = {
  distDir: 'build',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
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
