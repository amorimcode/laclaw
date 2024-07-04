import axios, { AxiosInstance } from "axios";

const BASE_URL = "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

export const getInstance = (): AxiosInstance => axiosInstance;
