/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['@vocoder/react', '@vocoder/types'],
}

module.exports = nextConfig 