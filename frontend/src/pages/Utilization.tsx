import { Box, Paper, Typography } from "@mui/material";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Static utilization data for development
const utilizationData = [
  { timestamp: "2024-01-01", utilization: 45 },
  { timestamp: "2024-01-02", utilization: 52 },
  { timestamp: "2024-01-03", utilization: 48 },
  { timestamp: "2024-01-04", utilization: 61 },
  { timestamp: "2024-01-05", utilization: 58 },
  { timestamp: "2024-01-06", utilization: 55 },
  { timestamp: "2024-01-07", utilization: 49 },
  { timestamp: "2024-01-08", utilization: 64 },
  { timestamp: "2024-01-09", utilization: 67 },
  { timestamp: "2024-01-10", utilization: 63 },
  { timestamp: "2024-01-11", utilization: 59 },
  { timestamp: "2024-01-12", utilization: 71 },
  { timestamp: "2024-01-13", utilization: 68 },
  { timestamp: "2024-01-14", utilization: 65 }
];

// Tooltip component matching Dashboard style
const UtilizationTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
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

export const Utilization = () => {
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
          Utilization
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          Detailed workspace utilization metrics and trends over time. This view
          provides granular insights into how your spaces are being used.
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
              Utilization Trend
            </Typography>
            <Typography
              variant="h6"
              sx={{
                letterSpacing: "-0.01em",
                fontWeight: 600
              }}
            >
              Workspace Utilization Over Time
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Percentage of workspace capacity in use. Derived from booking and
              occupancy data.
            </Typography>
            <Box sx={{ flex: 1, mt: 2 }}>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={utilizationData}>
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
          This page displays static development data. In production, utilization
          metrics will be derived from real-time booking and occupancy data
          from the analytics service.
        </Typography>
      </Paper>
    </Box>
  );
};
