const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'static.nike.com', 'assets.adidas.com', 'firebasestorage.googleapis.com'],
  }
}

module.exports = withPWA(nextConfig)

