import { useEffect, useState } from "react";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { analyticsApi } from "../api/analyticsApi";

interface UtilizationPoint {
  timestamp: string;
  utilization: number;
}

export const Dashboard = () => {
  const [data, setData] = useState<UtilizationPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchUtilization = async () => {
      setLoading(true);
      try {
        const response = await analyticsApi.getUtilization({
          scopeType: "WORKSPACE",
          from: "2024-01-01T00:00:00Z",
          to: "2024-01-31T23:59:59Z"
        });
        if (!isMounted) return;
        console.log(
          "[TEMP DEBUG] Utilization response",
          response,
          "points length:",
          Array.isArray((response as any)?.points)
            ? (response as any).points.length
            : "no points array"
        );
        const raw = response as unknown as {
          points?: Array<{
            timestamp?: string;
            utilizationPercent?: number | null;
          }>;
        };

        const points = Array.isArray(raw.points) ? raw.points : [];

        const normalized: UtilizationPoint[] = points
          .filter((p) => typeof p.timestamp === "string")
          .map((p) => ({
            timestamp: p.timestamp as string,
            utilization: typeof p.utilizationPercent === "number"
              ? p.utilizationPercent
              : 0
          }));

        setData(normalized);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUtilization();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Paper
        sx={{
          p: 3,
          minHeight: 240,
          display: "flex",
          flexDirection: "column",
          gap: 1
        }}
      >
        <Typography variant="h6">Space Utilization</Typography>
        <Typography variant="caption" color="text.secondary">
          Derived, non-real-time data
        </Typography>
        <Box sx={{ flex: 1, mt: 2 }}>
          {loading ? (
            <Skeleton variant="rounded" height={240} />
          ) : data.length === 0 ? (
            <Box
              sx={{
                height: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography color="text.secondary">
                No utilization data available.
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="utilization"
                  stroke="#1976d2"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

