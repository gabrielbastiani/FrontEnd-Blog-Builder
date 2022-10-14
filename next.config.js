
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  nextScriptWorkers: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['apiblog.builderseunegocioonline.com.br'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apiblog.builderseunegocioonline.com.br',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
}

module.exports = nextConfig
