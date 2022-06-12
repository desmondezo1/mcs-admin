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
  updateProduct: baseUrl + "/admin/products", // + product id
  login: baseUrl + "/login",
  register: baseUrl + "/",
  getUsers: baseUrl + "/admin/users",
  getAdminUsers: baseUrl + "/admin/admins",
  updateUser: baseUrl + "/admin/user", //+ user Id
  deleteUser: baseUrl + "/admin/user", //+ user Id
  updateOrder: baseUrl + "/admin/order", //+ order Id
  getProducts: baseUrl + "/products",
  getSingleProduct: baseUrl + "/product",
  updateProduct: baseUrl + "/admin/products",
  deleteProduct: baseUrl + "/admin/products",
  addBrand: baseUrl + "/admin/brands/create",
  getBrands: baseUrl + "/brands",
  getBrandsAdmin: baseUrl + "/admin/brands",
  addCategory: baseUrl + "/admin/categories/create",
  getCategories: baseUrl + "/categories",
  getOrdersAdmin: baseUrl + "/admin/orders",
};
