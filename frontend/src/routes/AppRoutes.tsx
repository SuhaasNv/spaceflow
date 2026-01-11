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
import { RequireAuth } from "../auth/RequireAuth";
import { useAuth } from "../auth/useAuth";
import { isDemoMode } from "../config/demoMode";

// Redirect logged-in users away from login page
const LoginRoute = () => {
  const { isAuthenticated, user } = useAuth();

  // If authenticated, redirect to dashboard
  if (isAuthenticated && user) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Login />;
};

// Root route handler - redirects to dashboard in demo mode
const RootRoute = () => {
  const demoMode = isDemoMode();
  
  if (demoMode) {
    // Demo mode: Redirect directly to dashboard for frictionless access
    // TODO: In production, remove demo mode or set VITE_DEMO_AUTH=false
    return <Navigate to="/app/dashboard" replace />;
  }
  
  // Production mode: Show homepage
  return <HomePage />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route
        path="/app/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/app/utilization"
        element={
          <RequireAuth>
            <Utilization />
          </RequireAuth>
        }
      />
      <Route
        path="/app/booking-usage"
        element={
          <RequireAuth>
            <BookingUsage />
          </RequireAuth>
        }
      />
      <Route
        path="/app/recommendations"
        element={
          <RequireAuth>
            <Recommendations />
          </RequireAuth>
        }
      />
      <Route
        path="/app/patterns"
        element={
          <RequireAuth>
            <Patterns />
          </RequireAuth>
        }
      />
      <Route
        path="/app/segments"
        element={
          <RequireAuth>
            <Segments />
          </RequireAuth>
        }
      />
      <Route
        path="/app/snapshots"
        element={
          <RequireAuth>
            <Snapshots />
          </RequireAuth>
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



