const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  experimental: {
    nextScriptWorkers: true,
    swcPlugins: [['next-superjson-plugin', {}]],
  },
})

module.exports = nextConfig
