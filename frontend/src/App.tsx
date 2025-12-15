import { useLocation } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { PublicLayout } from "./components/layout/PublicLayout";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";
  const isAppRoute = location.pathname.startsWith("/app/");

  // Show AppLayout only when logged in and on app routes
  if (isLoading) {
    return null;
  }

  // Public routes: homepage and login (no layout wrapper needed for login, PublicLayout for homepage)
  if (isHomePage) {
    return (
      <PublicLayout>
        <AppRoutes />
      </PublicLayout>
    );
  }

  if (isLoginPage || !user) {
    return <AppRoutes />;
  }

  // Authenticated app routes
  if (isAppRoute && user) {
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



