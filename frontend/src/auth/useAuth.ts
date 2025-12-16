import { useAuthContext } from "./AuthContext";

/**
 * Hook to access authentication state and methods.
 * 
 * Returns:
 * - isAuthenticated: boolean
 * - user: { email: string; role: "Workspace Admin" } | null
 * - login(email: string): void
 * - logout(): void
 */
export const useAuth = () => {
  return useAuthContext();
};


