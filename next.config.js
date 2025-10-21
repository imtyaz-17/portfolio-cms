/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  serverExternalPackages: ['@sanity/vision'],
  // Skip studio route during static export
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig

