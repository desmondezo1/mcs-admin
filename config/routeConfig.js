/* eslint-disable import/no-anonymous-default-export */
import nextConfig from "../next.config";

const baseUrl =
  nextConfig.env.ENVIROMENT === "local"
    ? "http://127.0.0.1:8000/api"
    : nextConfig.env.BACKEND_API_BASE_URL;
// let baseUrl = "http://127.0.0.1:8000/api";

export default {
  createProduct: baseUrl + "/admin/products/create",
  updateProduct: baseUrl + "/admin/products", // + product id
  updateProductStatus: baseUrl + "/admin/products/update", // + product id
  login: baseUrl + "/login",
  register: baseUrl + "/",
  deleteImage: baseUrl + "/admin/products/image", //+ imageId
  getUsers: baseUrl + "/admin/users",
  createUser: baseUrl + "/admin/user/create", 
  getUser: baseUrl + "/admin/user", // +userID
  getAdminUsers: baseUrl + "/admin/admins",
  updateUser: baseUrl + "/admin/user", //+ user Id
  updateNonAdminUser: baseUrl + "/user", //+ user Id
  updateUserStatus: baseUrl + "/admin/user", //+ {user_id}/status
  deleteUser: baseUrl + "/admin/user", //+ user Id
  deleteBrand: baseUrl + "/admin/brands", //+ brand Id
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
