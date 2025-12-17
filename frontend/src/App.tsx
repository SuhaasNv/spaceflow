import { useLocation } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { AppLayout } from "./components/layout/AppLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuth } from "./auth/useAuth";

const App = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";
  const isAppRoute = location.pathname.startsWith("/app/");

  // Show loading spinner while auth state is being determined
  // This prevents white screen if API calls are in progress
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

  // Public routes: homepage and login (no layout wrapper needed for login, PublicLayout for homepage)
  if (isHomePage) {
    return (
      <PublicLayout>
        <AppRoutes />
      </PublicLayout>
    );
  }

  if (isLoginPage || !isAuthenticated) {
    return <AppRoutes />;
  }

  // Authenticated app routes
  if (isAppRoute && isAuthenticated) {
    return (
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    );
  }

  // Fallback: show routes without layout
  return <AppRoutes />;
};

export default App;



