import { useEffect, useState } from "react";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

interface BookingUsageBucket {
  periodStart: string;
  bookedCount: number;
  usedCount: number;
  noShowCount: number;
}

export const Dashboard = () => {
  const [data, setData] = useState<UtilizationPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bookingBuckets, setBookingBuckets] = useState<BookingUsageBucket[]>(
    []
  );
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    // TODO: Replace dev-time date range and stubbed analytics wiring with real filters and live analytics data.
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

    const fetchBookingUsage = async () => {
      setBookingLoading(true);
      setBookingError(null);
      try {
        const response = await analyticsApi.getBookingUsage({
          scopeType: "WORKSPACE",
          from: "2024-01-01T00:00:00Z",
          to: "2024-01-31T23:59:59Z"
        });
        if (!isMounted) return;

        const raw = response as unknown as {
          buckets?: Array<{
            periodStart?: string;
            bookedCount?: number | null;
            usedCount?: number | null;
            noShowCount?: number | null;
          }>;
        };

        const buckets = Array.isArray(raw.buckets) ? raw.buckets : [];

        const normalized: BookingUsageBucket[] = buckets.map((b) => ({
          periodStart: typeof b.periodStart === "string" ? b.periodStart : "",
          bookedCount:
            typeof b.bookedCount === "number" ? b.bookedCount : 0,
          usedCount: typeof b.usedCount === "number" ? b.usedCount : 0,
          noShowCount:
            typeof b.noShowCount === "number" ? b.noShowCount : 0
        }));

        setBookingBuckets(normalized);
      } catch (error) {
        if (isMounted) {
          setBookingError("Failed to load booking vs usage data.");
        }
      } finally {
        if (isMounted) {
          setBookingLoading(false);
        }
      }
    };

    fetchUtilization();
    fetchBookingUsage();

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
      {/* TODO: Wire this card to real booking vs usage analytics once the backend pipeline is implemented. */}
      <Paper
        sx={{
          p: 3,
          minHeight: 240,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          position: "relative"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 12,
            px: 1,
            py: 0.25,
            borderRadius: 1,
            bgcolor: "warning.light",
            border: (theme) => `1px solid ${theme.palette.warning.main}`
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 600, color: "warning.dark" }}
          >
            DEV DATA
          </Typography>
        </Box>
        <Typography variant="h6">Booking vs Actual Usage</Typography>
        <Typography variant="caption" color="text.secondary">
          Derived comparison of bookings vs realized usage (development stub).
        </Typography>
        <Box sx={{ flex: 1, mt: 2 }}>
          {bookingLoading ? (
            <Skeleton variant="rounded" height={240} />
          ) : bookingError ? (
            <Box
              sx={{
                height: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <Typography color="error">
                {bookingError}
              </Typography>
            </Box>
          ) : bookingBuckets.length === 0 ? (
            <Box
              sx={{
                height: 240,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <Typography color="text.secondary">
                No booking vs usage data available.
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={bookingBuckets}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodStart" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="bookedCount"
                  name="Booked"
                  stackId="a"
                  fill="#1976d2"
                  isAnimationActive
                />
                <Bar
                  dataKey="usedCount"
                  name="Used"
                  stackId="a"
                  fill="#2e7d32"
                  isAnimationActive
                />
                <Bar
                  dataKey="noShowCount"
                  name="No-shows"
                  stackId="a"
                  fill="#ef6c00"
                  isAnimationActive
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

