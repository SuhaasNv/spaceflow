import { Box, Paper, Typography, Grid } from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Static pattern data for development
const weeklyPatternData = [
  { day: "Mon", occupancy: 68, bookings: 85 },
  { day: "Tue", occupancy: 72, bookings: 92 },
  { day: "Wed", occupancy: 75, bookings: 98 },
  { day: "Thu", occupancy: 71, bookings: 89 },
  { day: "Fri", occupancy: 58, bookings: 72 },
  { day: "Sat", occupancy: 22, bookings: 28 },
  { day: "Sun", occupancy: 15, bookings: 18 }
];

const hourlyPatternData = [
  { hour: "8:00", occupancy: 25 },
  { hour: "9:00", occupancy: 45 },
  { hour: "10:00", occupancy: 68 },
  { hour: "11:00", occupancy: 72 },
  { hour: "12:00", occupancy: 55 },
  { hour: "13:00", occupancy: 48 },
  { hour: "14:00", occupancy: 65 },
  { hour: "15:00", occupancy: 71 },
  { hour: "16:00", occupancy: 58 },
  { hour: "17:00", occupancy: 42 },
  { hour: "18:00", occupancy: 28 }
];

// Tooltip component
const PatternTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

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
        pointerEvents: "none"
      }}
    >
      <Typography
        variant="caption"
        sx={{
          display: "block",
          mb: 0.75,
          color: "rgba(255, 255, 255, 0.75)",
          fontWeight: 500,
          fontSize: "0.75rem"
        }}
      >
        {String(label)}
      </Typography>
      {payload.map((item: any, index: number) => (
        <Typography
          key={index}
          variant="body2"
          sx={{
            fontWeight: 600,
            color: item.color || activeColor,
            fontSize: "0.9375rem"
          }}
        >
          {item.name}: {item.value}%
        </Typography>
      ))}
    </Box>
  );
};

export const Patterns = () => {
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
          Patterns
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          Long-term occupancy and behavior patterns reveal usage trends across
          days, weeks, and hours. Use these insights to optimize space planning
          and resource allocation.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={(theme) => ({
              position: "relative",
              p: 3,
              minHeight: 320,
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
              borderColor: "rgba(74, 222, 128, 0.75)",
              boxShadow:
                "0 12px 32px rgba(15, 23, 42, 0.7), 0 0 0 1px rgba(15, 118, 110, 0.5)",
              backgroundImage:
                "radial-gradient(circle at top left, rgba(22, 163, 74, 0.22), transparent 58%), linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92))",
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
              Weekly Pattern
            </Typography>
            <Typography
              variant="h6"
              sx={{
                letterSpacing: "-0.01em",
                fontWeight: 600
              }}
            >
              Day-of-Week Occupancy
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Average occupancy and booking patterns by day of the week.
            </Typography>
            <Box sx={{ flex: 1, mt: 2 }}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={weeklyPatternData}>
                  <CartesianGrid
                    stroke="var(--sf-chart-grid-minor)"
                    strokeDasharray="2 6"
                  />
                  <XAxis
                    dataKey="day"
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
                  <Tooltip content={<PatternTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#38BDF8"
                    fill="#38BDF8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="bookings"
                    stroke="#4ADE80"
                    fill="#4ADE80"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper
            sx={(theme) => ({
              position: "relative",
              p: 3,
              minHeight: 320,
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
            <Typography
              variant="overline"
              sx={{
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "primary.light"
              }}
            >
              Hourly Pattern
            </Typography>
            <Typography
              variant="h6"
              sx={{
                letterSpacing: "-0.01em",
                fontWeight: 600
              }}
            >
              Peak Usage Hours
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Average occupancy throughout the day, showing peak usage periods.
            </Typography>
            <Box sx={{ flex: 1, mt: 2 }}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={hourlyPatternData}>
                  <CartesianGrid
                    stroke="var(--sf-chart-grid-minor)"
                    strokeDasharray="2 6"
                  />
                  <XAxis
                    dataKey="hour"
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
                  <Tooltip content={<PatternTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#38BDF8"
                    fill="#38BDF8"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

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
          This page displays static development data. In production, pattern
          analysis will be derived from historical occupancy and booking data
          from the analytics service.
        </Typography>
      </Paper>
    </Box>
  );
};
