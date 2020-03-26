import axios from 'axios'; 

const host = `http://localhost:5000/api`

const setToken = token => {
    if(token)
     axios.defaults.headers.common['Authorization'] = `anything ${token}`;
     else{
        delete axios.defaults.headers.common['Authorization']
     }
}
const call = async (method, path, data) => {
   const respone= await axios[method](`${host}/${path}`,data);
   return respone.data;
}

export default {call, setToken, host}