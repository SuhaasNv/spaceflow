import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { isDemoMode } from "../config/demoMode";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const demoMode = isDemoMode();

  if (loading) {
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

  // Demo mode: Always allow access (authentication is bypassed)
  // TODO: In production, remove demo mode or set VITE_DEMO_AUTH=false
  if (demoMode) {
    return <>{children}</>;
  }

  // Production mode: Require authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

