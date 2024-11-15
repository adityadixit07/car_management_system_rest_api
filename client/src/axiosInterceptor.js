import axios from "axios";

const axiosInstance = axios.create({
  //   baseURL: "https://car-management-system-rest-api.onrender.com/api/1",
  baseURL: "http://localhost:5000/api/1",
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
