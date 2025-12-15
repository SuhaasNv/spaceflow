import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Utilization } from "../pages/Utilization";
import { BookingUsage } from "../pages/BookingUsage";
import { Recommendations } from "../pages/Recommendations";
import { Patterns } from "../pages/Patterns";
import { Segments } from "../pages/Segments";
import { Snapshots } from "../pages/Snapshots";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/utilization" element={<Utilization />} />
      <Route path="/booking-usage" element={<BookingUsage />} />
      <Route path="/recommendations" element={<Recommendations />} />
      <Route path="/patterns" element={<Patterns />} />
      <Route path="/segments" element={<Segments />} />
      <Route path="/snapshots" element={<Snapshots />} />
    </Routes>
  );
};



