import { useLocation } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Show AppLayout only when logged in (not on login page)
  if (isLoading) {
    return null;
  }

  if (isLoginPage || !user) {
    return <AppRoutes />;
  }

  return (
    <AppLayout>
      <AppRoutes />
    </AppLayout>
  );
};

export default App;



