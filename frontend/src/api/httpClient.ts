import axios, { AxiosInstance } from "axios";

// Explicit, per-service base URLs to avoid accidental cross-service wiring.
const authBaseURL = import.meta.env
  .VITE_AUTH_API_BASE_URL as string | undefined;

const analyticsBaseURL = import.meta.env
  .VITE_ANALYTICS_API_BASE_URL as string | undefined;

// Dedicated clients per backend service.
export const authHttpClient: AxiosInstance = axios.create({
  baseURL: authBaseURL,
  timeout: 15000
});

export const analyticsHttpClient: AxiosInstance = axios.create({
  baseURL: analyticsBaseURL,
  timeout: 15000
});

// Legacy shared client – defaults to analytics, then auth.
// Prefer using the service-specific clients above in new code.
export const httpClient: AxiosInstance =
  analyticsHttpClient ?? authHttpClient;
