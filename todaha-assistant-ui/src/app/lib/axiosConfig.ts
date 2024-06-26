import { getToken } from '@/states/auth';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL1, // Replace with your API base URL
    // Other custom settings can go here
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return the response
        return response;
    },
    (error) => {
        // If the response is an error, check for the 401 status code
        if (error.response && error.response.status === 401) {
            // Redirect to the login page
            window.location.href = '/auth/login';
            return new Promise(() => {});
        }
        // Return any other errors
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.request.use((config) => {
    const token = getToken();
    if (token && token !== '') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
    

export default axiosInstance;
