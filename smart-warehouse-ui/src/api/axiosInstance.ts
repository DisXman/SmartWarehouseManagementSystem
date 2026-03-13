import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7121/api', // Kendi Backend portunu (Swagger'daki URL) buraya yaz
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;