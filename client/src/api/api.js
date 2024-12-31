import axios from 'axios';
import { } from 'react-router-dom';

const baseURL = 'http://localhost:3000/v1';

const api = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = JSON.parse(localStorage.getItem('site')).refresh?.token;
            if (refreshToken) {
                try {
                    const response = await axios.post(`${baseURL}/auth/refresh-tokens`, { refreshToken });
                    const newTokens = response.data;
                    localStorage.setItem('site', JSON.stringify(newTokens));
                    originalRequest.headers.Authorization = `Bearer ${newTokens.access.token}`;
                    return axios(originalRequest);
                } catch (error) {
                    localStorage.clear();
                    window.location.href('/login');
                }
            }
        }
        return Promise.reject(error);
    }
);


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default api;