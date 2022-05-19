/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
  },
  env: {
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    ENVIROMENT : process.env.ENV,
  }
}

module.exports = nextConfig
