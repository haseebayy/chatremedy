import axios from 'axios';





const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8080/api/v1' });

axiosInstance.interceptors.request.use(
  function (config) {
    // Get token from localStorage
    const token = localStorage.getItem('custom-auth-token');

    // Set token in headers if available
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers['ngrok-skip-browser-warning'] = `true`;


    // Do something before request is sent
    console.log('Request sent:', config);
    return config;
  },
  function (error) {
    // Do something with request error
    console.error('Error sending request:', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with successful response
    console.log('Response received:', response);
    return response;
  },
  function (error) {
    // Do something with response error
    console.error('Error receiving response:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;