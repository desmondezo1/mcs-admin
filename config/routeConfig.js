
let baseUrl = "http://127.0.0.1:8000/api";

if (process.env.ENV === "prod") {
  baseUrl =  process.env.BACKEND_API_BASE_URL;  
}
export default {
    createProduct : baseUrl + "/admin/products/create",
    login : baseUrl + "/login",
    register : baseUrl + "/",
    addBrand : baseUrl + "/",
    addCategory : baseUrl + "/",
}