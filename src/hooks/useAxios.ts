import axios from "axios";
import { API_URL } from "./useEnv";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxios = () => axiosInstance;
