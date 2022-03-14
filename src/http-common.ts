import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "./store";
const getToken = () => {
  // return sessionStorage.getItem("token") || "";
  return store.state.token

};
const ApiClient: AxiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-type": "application/json",
  },
});

ApiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
ApiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    // 请求失败
    (error) => {
      return Promise.reject(error);
    }
);
export default ApiClient;
