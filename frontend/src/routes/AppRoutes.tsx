import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
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
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Login />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/app/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/utilization"
        element={
          <ProtectedRoute>
            <Utilization />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/booking-usage"
        element={
          <ProtectedRoute>
            <BookingUsage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/recommendations"
        element={
          <ProtectedRoute>
            <Recommendations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/patterns"
        element={
          <ProtectedRoute>
            <Patterns />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/segments"
        element={
          <ProtectedRoute>
            <Segments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/snapshots"
        element={
          <ProtectedRoute>
            <Snapshots />
          </ProtectedRoute>
        }
      />
      {/* Redirect old routes to new /app/* structure */}
      <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/utilization" element={<Navigate to="/app/utilization" replace />} />
      <Route path="/booking-usage" element={<Navigate to="/app/booking-usage" replace />} />
      <Route path="/recommendations" element={<Navigate to="/app/recommendations" replace />} />
      <Route path="/patterns" element={<Navigate to="/app/patterns" replace />} />
      <Route path="/segments" element={<Navigate to="/app/segments" replace />} />
      <Route path="/snapshots" element={<Navigate to="/app/snapshots" replace />} />
    </Routes>
  );
};



