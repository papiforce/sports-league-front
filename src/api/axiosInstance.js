import axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_API_URI } = process.env;

axios.defaults.baseURL = REACT_APP_API_URI;

const axiosInstance = axios;

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("lsa-token");
    const auth = token ? `Bearer ${token}` : null;

    if (auth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosInstance };
