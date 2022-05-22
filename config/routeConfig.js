/* eslint-disable import/no-anonymous-default-export */
import nextConfig from "../next.config";

console.log(nextConfig.env.BACKEND_API_BASE_URL);
console.log("I am working");
const baseUrl =
  nextConfig.env.ENVIROMENT === "local"
    ? "http://127.0.0.1:8000/api"
    : nextConfig.env.BACKEND_API_BASE_URL;
// let baseUrl = "http://127.0.0.1:8000/api";

export default {
  createProduct: baseUrl + "/admin/products/create",
  login: baseUrl + "/login",
  register: baseUrl + "/",
  getProducts: baseUrl + "/products",
  updateProduct: baseUrl + "/admin/products",
  addBrand: baseUrl + "/admin/brands/create",
  getBrands: baseUrl + "/brands",
  getBrandsAdmin: baseUrl + "/admin/brands",
  addCategory: baseUrl + "/admin/categories/create",
  getCategories: baseUrl + "/categories",
  getOrdersAdmin: baseUrl + "/admin/orders",
};
