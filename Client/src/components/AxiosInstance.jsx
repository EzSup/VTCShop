import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:5000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

export const isStatusCodeSuccessful = (statusCode) =>
  statusCode >= 200 && statusCode < 300;

export default axiosInstance;