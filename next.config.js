/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: false,
  },
  env: {
    BACKEND_API_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL,
    ENVIROMENT: process.env.NEXT_PUBLIC_ENV,
  },
  images: {
    domains: [
      "https://backend-api.mcsgroupsrl.com",
      "http://127.0.0.1:8000",
      "127.0.0.1",
      "picsum.photos",
      "backend-api.mcsgroupsrl.com",
      "mcsgroupsrl.com",
    ],
  },
};

module.exports = nextConfig;
