// import Cok from 'cookie'
import Cookies from 'js-cookie'
import axios from 'axios'

export default async function axiosHttp(url, data, method, token){
    if(!token){
        token = Cookies.set('token');
    }

    const axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
      }
    }

    let ax;
    if (method === "GET" || method === "get") {
         ax = await axios.get(
            url,
            axiosConfig
        );
    }

    if (method === "POST" || method === "post") {
         ax = await axios.post(
            url,
            data,
            axiosConfig
        )
    }
 
    if (method === "PATCH" || method === "patch") {
         ax = await axios.patch(
            url,
            data,
            axiosConfig
        )
    }

    if (method === "DELETE" || method === "delete") {
         ax = await axios.delete(
            url,
            axiosConfig
        )
    }

    let result = await ax;
    return result.data.data;

  
}
