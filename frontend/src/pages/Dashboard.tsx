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
import { AiRecommendationsPanel } from "../components/AiRecommendationsPanel";

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

// Custom tooltip for utilization line chart
const UtilizationTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const point = payload[0];

  return (
    <Box
      sx={(theme) => ({
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        bgcolor: "rgba(15, 23, 42, 0.96)",
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        maxWidth: 260,
        transform: "scale(1)",
        opacity: 1,
        transition: "opacity 120ms ease-out, transform 120ms ease-out"
      })}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 0.5 }}
      >
        {String(label)}
      </Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "primary.light" }}
      >
        {point.value}
        {" %"}
      </Typography>
    </Box>
  );
};

// Custom tooltip for booking vs usage bar chart
const BookingUsageTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const items = payload as Array<{
    name: string;
    value: number;
    color: string;
  }>;

  return (
    <Box
      sx={(theme) => ({
        px: 1.5,
        py: 1,
        borderRadius: 1.5,
        bgcolor: "rgba(15, 23, 42, 0.96)",
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        transform: "scale(1)",
        opacity: 1,
        transition: "opacity 120ms ease-out, transform 120ms ease-out"
      })}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 0.75 }}
      >
        {String(label)}
      </Typography>
      {items.map((item) => (
        <Box
          key={item.name}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 0.25
          }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textTransform: "capitalize" }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color:
                item.name.toLowerCase() === "used"
                  ? "success.light"
                  : "primary.light"
            }}
          >
            {item.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "relative",
          mb: 0.5,
          pt: 0.5,
          pb: 1.5,
          // Soft ambient glow behind header
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-40% 0 auto",
            background:
              "radial-gradient(circle at top, rgba(99, 102, 241, 0.35), transparent 60%)",
            opacity: 0.6,
            pointerEvents: "none",
            zIndex: -1
          }
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ letterSpacing: "-0.02em", mb: 0.5 }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          High-level view of how your workspace is being used, with AI-powered
          advisory insights.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          alignItems: "flex-start",
          gap: 3
        }}
      >
        <Box
          sx={{
            flex: { xs: "1 1 auto", lg: "2 1 0" },
            display: "flex",
            flexDirection: "column",
            gap: 3
          }}
        >
          <Paper
            sx={{
              p: 3,
              minHeight: 240,
              display: "flex",
              flexDirection: "column",
              gap: 1.25
            }}
          >
            <Typography
              variant="h6"
              sx={{ letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              Space Utilization
            </Typography>
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
                    <CartesianGrid
                      stroke="rgba(148, 163, 184, 0.14)"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="timestamp"
                      tick={{
                        fill: "rgba(148, 163, 184, 0.8)",
                        fontSize: 11
                      }}
                      axisLine={{
                        stroke: "rgba(51, 65, 85, 0.6)",
                        strokeWidth: 0.5
                      }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fill: "rgba(148, 163, 184, 0.8)",
                        fontSize: 11
                      }}
                      axisLine={{
                        stroke: "rgba(51, 65, 85, 0.6)",
                        strokeWidth: 0.5
                      }}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<UtilizationTooltip />}
                      cursor={{
                        stroke: "rgba(148, 163, 184, 0.4)",
                        strokeWidth: 1,
                        strokeDasharray: "3 3"
                      }}
                      wrapperStyle={{
                        outline: "none"
                      }}
                      contentStyle={{
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        padding: 0
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="utilization"
                      stroke="#38BDF8"
                      strokeWidth={2.4}
                      dot={false}
                      activeDot={{
                        r: 5,
                        stroke: "#38BDF8",
                        strokeWidth: 2,
                        fill: "#020617",
                        style: {
                          filter:
                            "drop-shadow(0 0 10px rgba(56, 189, 248, 0.9))"
                        }
                      }}
                      isAnimationActive
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
              gap: 1.25,
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
            <Typography
              variant="h6"
              sx={{ letterSpacing: "0.04em", textTransform: "uppercase" }}
            >
              Booking vs Actual Usage
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Derived comparison of bookings vs realized usage (development
              stub).
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
                    <CartesianGrid
                      stroke="rgba(148, 163, 184, 0.14)"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="periodStart"
                      tick={{
                        fill: "rgba(148, 163, 184, 0.8)",
                        fontSize: 11
                      }}
                      axisLine={{
                        stroke: "rgba(51, 65, 85, 0.6)",
                        strokeWidth: 0.5
                      }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fill: "rgba(148, 163, 184, 0.8)",
                        fontSize: 11
                      }}
                      axisLine={{
                        stroke: "rgba(51, 65, 85, 0.6)",
                        strokeWidth: 0.5
                      }}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<BookingUsageTooltip />}
                      cursor={{ fill: "rgba(15, 23, 42, 0.2)" }}
                      wrapperStyle={{
                        outline: "none"
                      }}
                      contentStyle={{
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        padding: 0
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="bookedCount"
                      name="Booked"
                      stackId="a"
                      fill="#38BDF8"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive
                    />
                    <Bar
                      dataKey="usedCount"
                      name="Used"
                      stackId="a"
                      fill="#4ADE80"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive
                    />
                    <Bar
                      dataKey="noShowCount"
                      name="No-shows"
                      stackId="a"
                      fill="#F97316"
                      radius={[4, 4, 0, 0]}
                      isAnimationActive
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Box>
          </Paper>
        </Box>
        <Box
          sx={{
            flex: { xs: "1 1 auto", lg: "1 1 0" },
            minWidth: { lg: 320 },
            maxWidth: { lg: 420 }
          }}
        >
          <AiRecommendationsPanel />
        </Box>
      </Box>
    </Box>
  );
};

