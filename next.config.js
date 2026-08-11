/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  // ✅ Remove `experimental.serverActions` – it's now enabled by default in Next.js 14+
}

module.exports = nextConfig