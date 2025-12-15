import axios, { AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined;

// Shared Axios instance for SpaceFlow services.
export const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000
});
