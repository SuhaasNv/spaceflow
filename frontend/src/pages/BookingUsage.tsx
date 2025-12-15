import { Box, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Static booking usage data for development
const bookingUsageData = [
  { periodStart: "Week 1", bookedCount: 120, usedCount: 95, noShowCount: 25 },
  { periodStart: "Week 2", bookedCount: 145, usedCount: 118, noShowCount: 27 },
  { periodStart: "Week 3", bookedCount: 132, usedCount: 105, noShowCount: 27 },
  { periodStart: "Week 4", bookedCount: 158, usedCount: 132, noShowCount: 26 },
  { periodStart: "Week 5", bookedCount: 142, usedCount: 121, noShowCount: 21 },
  { periodStart: "Week 6", bookedCount: 165, usedCount: 138, noShowCount: 27 }
];

// Tooltip component matching Dashboard style
const BookingUsageTooltip = ({ active, payload, label, coordinate }: any) => {
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

export const BookingUsage = () => {
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
          Booking Usage
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          Compare booking patterns against actual usage to identify no-shows and
          optimize space allocation. Track booking efficiency over time.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 3
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Paper
            sx={(theme) => ({
              position: "relative",
              p: 3,
              minHeight: 400,
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
              Stacked comparison showing booked, used, and no-show counts per
              period.
            </Typography>
            <Box sx={{ flex: 1, mt: 2 }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={bookingUsageData}
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
            </Box>
          </Paper>
        </Box>
      </Box>

      <Paper
        sx={(theme) => ({
          p: 2.5,
          borderRadius: 2,
          bgcolor: "rgba(15, 23, 42, 0.6)",
          border: `1px dashed ${theme.palette.warning.main}33`,
          display: "flex",
          flexDirection: "column",
          gap: 1
        })}
      >
        <Typography variant="caption" color="warning.light" fontWeight={600}>
          Development Note
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This page displays static development data. In production, booking
          usage metrics will be derived from real booking and occupancy data
          from the booking and analytics services.
        </Typography>
      </Paper>
    </Box>
  );
};
