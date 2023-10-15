import axios from "axios";
import cookie from 'js-cookie'
const instance = axios.create({
    baseURL: 'https://posts-server-drab.vercel.app:5000/api',
    withCredentials:true
});

instance.interceptors.request.use(config => {
    const refreshToken = cookie.get('Refreshtoken');
    const authorization = localStorage.getItem('authorization');
    config.headers['Authorization'] = authorization;
    config.headers['refreshToken'] = refreshToken;
    return config;
});


export default instance;
