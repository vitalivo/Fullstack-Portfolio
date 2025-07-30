/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '127.0.0.1:3000']
    }
  },
  images: {
    domains: ['127.0.0.1', 'localhost']
  }
}

module.exports = nextConfig