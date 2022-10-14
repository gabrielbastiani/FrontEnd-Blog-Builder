
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  nextScriptWorkers: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
