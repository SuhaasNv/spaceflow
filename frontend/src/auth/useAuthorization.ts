import { useAuth } from "../context/AuthContext";

type SupportedRole = "ADMIN" | "FACILITIES_MANAGER" | "VIEWER" | string;

export const useAuthorization = () => {
  const { user } = useAuth();

  const role: SupportedRole | null = user?.role ?? null;

  const isAdmin = role === "ADMIN";
  const isFacilitiesManager = role === "FACILITIES_MANAGER";
  const isViewer = role === "VIEWER";

  return {
    role,
    isAdmin,
    isFacilitiesManager,
    isViewer
  };
};


