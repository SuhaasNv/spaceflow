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

// Snap-to-point tooltip for utilization line chart
// Positioned on top of the data point, stays within chart bounds
const UtilizationTooltip = ({ active, payload, label, coordinate }: any) => {
  // Only render when hovering a data point
  if (!active || !payload || !payload.length || !coordinate) {
    return null;
  }

  const point = payload[0];
  const activeColor = "#38BDF8";

  return (
    <Box
      sx={{
        px: 2.5,
        py: 1.75,
        borderRadius: "10px",
        bgcolor: "rgba(15, 23, 42, 0.95)",
        border: `1px solid ${activeColor}50`,
        boxShadow: `
          0 8px 24px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.08),
          0 0 16px ${activeColor}15
        `,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        width: 260,
        minWidth: 260,
        maxWidth: 260,
        pointerEvents: "none",
        position: "relative",
        // Arrow indicator pointing down to the data point
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: 12,
          height: 12,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          borderRight: `1px solid ${activeColor}50`,
          borderBottom: `1px solid ${activeColor}50`,
          zIndex: 1
        }
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 0.75,
          color: "rgba(255, 255, 255, 0.75)",
          fontWeight: 500,
          fontSize: "0.75rem",
          letterSpacing: "0.02em"
        }}
      >
        {String(label)}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          color: activeColor,
          fontSize: "1.125rem",
          lineHeight: 1.3
        }}
      >
        {point.value}%
      </Typography>
    </Box>
  );
};

// Snap-to-point tooltip for booking vs usage bar chart
// Positioned on top of the bar
const BookingUsageTooltip = ({ active, payload, label, coordinate }: any) => {
  // Only render when hovering a data point
  if (!active || !payload || !payload.length || !coordinate) {
    return null;
  }

  const items = payload as Array<{
    name: string;
    value: number;
    color: string;
  }>;

  const getActiveColor = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName === "used") return "#4ADE80";
    if (lowerName === "booked") return "#38BDF8";
    return "#F97316";
  };

  const primaryColor = items.length > 0 ? getActiveColor(items[0].name) : "#38BDF8";

  return (
    <Box
      sx={{
        position: "relative",
        px: 2.5,
        py: 1.75,
        borderRadius: "10px",
        bgcolor: "rgba(15, 23, 42, 0.95)",
        border: `1px solid ${primaryColor}50`,
        boxShadow: `
          0 8px 24px rgba(0, 0, 0, 0.5),
          0 0 0 1px rgba(255, 255, 255, 0.08),
          0 0 16px ${primaryColor}15
        `,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        width: 280,
        minWidth: 280,
        maxWidth: 280,
        pointerEvents: "none",
        // Arrow indicator pointing down to the bar
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: -6,
          left: "50%",
          transform: "translateX(-50%) rotate(45deg)",
          width: 12,
          height: 12,
          backgroundColor: "rgba(15, 23, 42, 0.95)",
          borderRight: `1px solid ${primaryColor}50`,
          borderBottom: `1px solid ${primaryColor}50`,
          zIndex: 1
        }
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 1.25,
          color: "rgba(255, 255, 255, 0.75)",
          fontWeight: 500,
          fontSize: "0.75rem",
          letterSpacing: "0.02em"
        }}
      >
        {String(label)}
      </Typography>
      {items.map((item, index) => {
        const itemColor = getActiveColor(item.name);
        const isPrimary = index === 0;
        
        return (
          <Box
            key={item.name}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: index < items.length - 1 ? 1 : 0
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: itemColor,
                boxShadow: `0 0 6px ${itemColor}50`,
                flexShrink: 0
              }}
            />
            <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography
                variant="caption"
                sx={{
                  textTransform: "capitalize",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "0.8125rem",
                  fontWeight: 500
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isPrimary ? 700 : 600,
                  fontSize: isPrimary ? "1rem" : "0.9375rem",
                  color: itemColor
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Box>
        );
      })}
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
          mb: 0.75,
          pt: 0.75,
          pb: 1.75,
          // Soft ambient glow + subtle separator from the top bar
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "-40% 0 auto",
            background:
              "radial-gradient(circle at top, rgba(99, 102, 241, 0.35), transparent 60%)",
            opacity: 0.6,
            pointerEvents: "none",
            zIndex: -2
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: "auto 0 -12px",
            height: 24,
            background:
              "linear-gradient(to bottom, rgba(15, 23, 42, 0.9), transparent)",
            opacity: 0.9,
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
            sx={(theme) => ({
              position: "relative",
              p: 3,
              minHeight: 260,
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
              borderColor: "rgba(74, 222, 128, 0.75)",
              boxShadow:
                "0 12px 32px rgba(15, 23, 42, 0.7), 0 0 0 1px rgba(15, 118, 110, 0.5)",
              backgroundImage:
                "radial-gradient(circle at top left, rgba(22, 163, 74, 0.22), transparent 58%), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92))",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: "-40% -40% auto",
                background:
                  "radial-gradient(circle at 10% -10%, rgba(74, 222, 128, 0.32), transparent 55%)",
                opacity: 0.9,
                pointerEvents: "none",
                mixBlendMode: "screen"
              },
              "&:hover": {
                borderColor: "rgba(74, 222, 128, 0.9)",
                boxShadow:
                  "0 14px 36px rgba(15, 23, 42, 0.75), 0 0 0 1px rgba(74, 222, 128, 0.4)",
                transform: "translateY(-3px)"
              },
              "&:focus-within": {
                outline: "2px solid",
                outlineOffset: 3,
                outlineColor: theme.palette.primary.main
              }
            })}
          >
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "primary.light"
              }}
            >
              Primary signal
            </Typography>
            <Typography
              variant="h6"
              sx={{
                letterSpacing: "-0.01em",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1
              }}
            >
              Space Utilization
              <Box
                component="span"
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 999,
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  bgcolor: "rgba(15, 23, 42, 0.9)",
                  border: (theme) =>
                    `1px solid ${theme.palette.primary.main}66`,
                  color: "primary.light"
                }}
              >
                Focus
              </Box>
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Derived, non-real-time view of overall workspace usage.
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
                      stroke="var(--sf-chart-grid-minor)"
                      strokeDasharray="2 6"
                    />
                    <XAxis
                      dataKey="timestamp"
                      tick={{
                        fill: "var(--sf-chart-axis-label)",
                        fontSize: 12,
                        fontWeight: 500
                      }}
                      axisLine={{
                        stroke: "var(--sf-chart-axis-line)",
                        strokeWidth: 0.8
                      }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fill: "var(--sf-chart-axis-label)",
                        fontSize: 12,
                        fontWeight: 500
                      }}
                      axisLine={{
                        stroke: "var(--sf-chart-axis-line)",
                        strokeWidth: 0.8
                      }}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<UtilizationTooltip />}
                      cursor={false}
                      animationDuration={200}
                      allowEscapeViewBox={{ x: false, y: false }}
                      wrapperStyle={{
                        outline: "none",
                        pointerEvents: "none"
                      }}
                      contentStyle={{
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        padding: 0,
                        pointerEvents: "none"
                      }}
                      labelStyle={{
                        display: "none"
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="utilization"
                      stroke="#38BDF8"
                      strokeWidth={2.4}
                      dot={false}
                      activeDot={{
                        r: 8,
                        stroke: "#38BDF8",
                        strokeWidth: 3,
                        fill: "#020617",
                        style: {
                          filter:
                            "drop-shadow(0 0 8px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 16px rgba(56, 189, 248, 0.3))",
                          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)"
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
            sx={(theme) => ({
              position: "relative",
              p: 3,
              minHeight: 240,
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
              opacity: 0.96,
              borderColor: "rgba(148, 163, 184, 0.35)",
              boxShadow:
                "0 10px 24px rgba(15, 23, 42, 0.6), 0 0 0 1px rgba(15, 23, 42, 0.7)",
              backgroundImage:
                "linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.9))",
              "&:hover": {
                borderColor: "rgba(148, 163, 184, 0.55)",
                boxShadow: "0 12px 28px rgba(15, 23, 42, 0.65)",
                transform: "translateY(-2px)"
              },
              "&:focus-within": {
                outline: "2px solid",
                outlineOffset: 2,
                outlineColor: theme.palette.primary.main
              }
            })}
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
                      stroke="var(--sf-chart-grid-minor)"
                      strokeDasharray="2 6"
                    />
                    <XAxis
                      dataKey="periodStart"
                      tick={{
                        fill: "var(--sf-chart-axis-label)",
                        fontSize: 12,
                        fontWeight: 500
                      }}
                      axisLine={{
                        stroke: "var(--sf-chart-axis-line)",
                        strokeWidth: 0.8
                      }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{
                        fill: "var(--sf-chart-axis-label)",
                        fontSize: 12,
                        fontWeight: 500
                      }}
                      axisLine={{
                        stroke: "var(--sf-chart-axis-line)",
                        strokeWidth: 0.8
                      }}
                      tickLine={false}
                    />
                    <Tooltip
                      content={<BookingUsageTooltip />}
                      cursor={false}
                      animationDuration={200}
                      allowEscapeViewBox={{ x: false, y: false }}
                      wrapperStyle={{
                        outline: "none",
                        pointerEvents: "none"
                      }}
                      contentStyle={{
                        background: "transparent",
                        border: "none",
                        boxShadow: "none",
                        padding: 0,
                        pointerEvents: "none"
                      }}
                      labelStyle={{
                        display: "none"
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

