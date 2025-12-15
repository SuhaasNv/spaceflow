import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { Box, CircularProgress } from "@mui/material";

/**
 * DEMO-ONLY AUTHENTICATION BOUNDARY
 * 
 * Protects routes by checking authentication state.
 * - If not authenticated → redirects to /login
 * - If authenticated → renders children
 */
interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, user } = useAuth();

  // Brief loading check: if user is null but we have stored auth, wait a moment
  // This prevents redirect flash during initial load from localStorage
  if (!isAuthenticated && user === null) {
    const storedAuth = localStorage.getItem("spaceflow_auth");
    if (storedAuth) {
      // Auth exists in storage but not yet loaded, show loading briefly
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            bgcolor: "background.default"
          }}
        >
          <CircularProgress />
        </Box>
      );
    }
    // Not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

