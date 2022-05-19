import nextConfig from "../next.config";
const baseUrl = nextConfig.env.ENVIROMENT == "local" ? "http://127.0.0.1:8000/api" : nextConfig.env.BACKEND_API_BASE_URL ;

export default {
    createProduct : baseUrl + "/admin/products/create",
    login : baseUrl + "/login",
    register : baseUrl + "/",
    addBrand : baseUrl + "/admin/brands/create",
    addCategory : baseUrl + "/",
}