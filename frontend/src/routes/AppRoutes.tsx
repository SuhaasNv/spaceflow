import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Utilization } from "../pages/Utilization";
import { BookingUsage } from "../pages/BookingUsage";
import { Recommendations } from "../pages/Recommendations";
import { Patterns } from "../pages/Patterns";
import { Segments } from "../pages/Segments";
import { Snapshots } from "../pages/Snapshots";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

// Redirect logged-in users away from login page
const LoginRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Login />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/utilization"
        element={
          <ProtectedRoute>
            <Utilization />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-usage"
        element={
          <ProtectedRoute>
            <BookingUsage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patterns"
        element={
          <ProtectedRoute>
            <Patterns />
          </ProtectedRoute>
        }
      />
      <Route
        path="/segments"
        element={
          <ProtectedRoute>
            <Segments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/snapshots"
        element={
          <ProtectedRoute>
            <Snapshots />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};



