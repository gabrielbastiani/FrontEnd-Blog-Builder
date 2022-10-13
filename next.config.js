/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  nextScriptWorkers: true,
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
