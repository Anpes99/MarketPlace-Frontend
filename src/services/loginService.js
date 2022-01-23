import axios from "axios";


const loginUser = (username, password) =>{
    return axios.post('/api/login', {username, password})
}

export default loginUser