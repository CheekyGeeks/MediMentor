import axios from 'axios';

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    // If the error is due to an expired token and we haven't already tried to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post(`${API_URL}/api/auth/token/refresh/`, {
          refresh: refreshToken
        });
        
        if (res.data.access) {
          localStorage.setItem('token', res.data.access);
          
          // Update the original request with the new token
          originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token also fails, log the user out
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;