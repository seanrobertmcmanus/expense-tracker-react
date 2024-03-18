import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
    baseURL: BASE_URL,

});

export const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});