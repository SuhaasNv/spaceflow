import { authHttpClient } from "./httpClient";

export interface AuthUser {
  id: string;
  role: string;
}

export interface LoginResponse {
  user: AuthUser;
}

export interface ValidateSessionResponse {
  user: AuthUser | null;
}

const withCredsConfig = { withCredentials: true as const };

export async function login(email: string, password: string): Promise<AuthUser> {
  const response = await authHttpClient.post<LoginResponse>(
    "/auth/login",
    { email, password },
    withCredsConfig
  );
  return response.data.user;
}

export async function validateSession(): Promise<AuthUser | null> {
  const response = await authHttpClient.get<ValidateSessionResponse>(
    "/auth/validate",
    withCredsConfig
  );
  return response.data.user ?? null;
}

export async function logout(): Promise<void> {
  await authHttpClient.post("/auth/logout", undefined, withCredsConfig);
}


