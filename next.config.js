/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
  },
  env: {
    BACKEND_API_BASE_URL: process.env.BACKEND_API_BASE_URL,
    ENVIROMENT : process.env.ENV,
  },
  images: {
    domains: ['https://backend-api.mcsgroupsrl.com','http://127.0.0.1:8000','127.0.0.1','backend-api.mcsgroupsrl.com','mcsgroupsrl.com'],
  }
}

module.exports = nextConfig
