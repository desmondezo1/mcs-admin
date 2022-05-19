
const baseUrl = process.env.ENV === "prod" ?  process.env.BACKEND_API_BASE_URL : "http://127.0.0.1:8000/api";


export default {
    createProduct : baseUrl + "/admin/products/create",
    login : baseUrl + "/login",
    register : baseUrl + "/",
    addBrand : baseUrl + "/",
    addCategory : baseUrl + "/",
}