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
  // ✅ Add this to bypass the prerender check
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig