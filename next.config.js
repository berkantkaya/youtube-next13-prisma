/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images:{
    domains: ['upload.wikimedia.org', 'lh3.googleusercontent.com']
  }
}

module.exports = nextConfig
