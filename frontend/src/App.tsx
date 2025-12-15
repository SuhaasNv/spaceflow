import { useLocation } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuth } from "./auth/useAuth";

const App = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";
  const isAppRoute = location.pathname.startsWith("/app/");

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



