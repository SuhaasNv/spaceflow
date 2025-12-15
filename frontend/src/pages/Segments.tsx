import { Box, Paper, Typography, Grid, Chip } from "@mui/material";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

// Static segment data for development
const userSegmentData = [
  { name: "Engineering", value: 35, color: "#38BDF8" },
  { name: "Sales", value: 22, color: "#4ADE80" },
  { name: "Marketing", value: 18, color: "#F97316" },
  { name: "Operations", value: 15, color: "#A855F7" },
  { name: "Other", value: 10, color: "#94A3B8" }
];

const spaceSegmentData = [
  { name: "Meeting Rooms", value: 42, color: "#38BDF8" },
  { name: "Desk Spaces", value: 28, color: "#4ADE80" },
  { name: "Collaboration Areas", value: 18, color: "#F97316" },
  { name: "Quiet Zones", value: 12, color: "#A855F7" }
];

const segmentMetrics = [
  {
    segment: "Engineering",
    utilization: 72,
    avgBookingDuration: "2.5h",
    peakHours: "10:00-15:00"
  },
  {
    segment: "Sales",
    utilization: 68,
    avgBookingDuration: "1.8h",
    peakHours: "09:00-12:00"
  },
  {
    segment: "Marketing",
    utilization: 55,
    avgBookingDuration: "2.2h",
    peakHours: "11:00-14:00"
  },
  {
    segment: "Operations",
    utilization: 61,
    avgBookingDuration: "1.5h",
    peakHours: "08:00-11:00"
  }
];

// Tooltip component
const SegmentTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0];
  const activeColor = data.payload.color || "#38BDF8";

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
        variant="body2"
        sx={{
          fontWeight: 600,
          color: activeColor,
          fontSize: "0.9375rem",
          mb: 0.5
        }}
      >
        {data.name}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255, 255, 255, 0.75)",
          fontSize: "0.8125rem"
        }}
      >
        {data.value}% of total
      </Typography>
    </Box>
  );
};

export const Segments = () => {
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
          Segments
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          Analyze workspace usage by user segments and space types. Understand
          how different groups utilize spaces and identify optimization
          opportunities.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={(theme) => ({
              position: "relative",
              p: 3,
              minHeight: 360,
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
              User Segments
            </Typography>
            <Typography
              variant="h6"
              sx={{
                letterSpacing: "-0.01em",
                fontWeight: 600
              }}
            >
              Usage by Department
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Distribution of workspace usage across different user segments.
            </Typography>
            <Box sx={{ flex: 1, mt: 2 }}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={userSegmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {userSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<SegmentTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper
            sx={(theme) => ({
              position: "relative",
              p: 3,
              minHeight: 360,
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
              Space Segments
            </Typography>
            <Typography
              variant="h6"
              sx={{
                letterSpacing: "-0.01em",
                fontWeight: 600
              }}
            >
              Usage by Space Type
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Distribution of bookings across different space categories.
            </Typography>
            <Box sx={{ flex: 1, mt: 2 }}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={spaceSegmentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spaceSegmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<SegmentTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        sx={(theme) => ({
          p: 3,
          borderRadius: 2.5,
          bgcolor: "rgba(15, 23, 42, 0.92)",
          border: `1px solid ${theme.palette.divider}`,
          display: "flex",
          flexDirection: "column",
          gap: 2
        })}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Segment Metrics
        </Typography>
        <Grid container spacing={2}>
          {segmentMetrics.map((metric) => (
            <Grid item xs={12} sm={6} md={3} key={metric.segment}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "rgba(15, 23, 42, 0.6)",
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1
                }}
              >
                <Typography variant="subtitle2" fontWeight={600}>
                  {metric.segment}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Utilization: <strong>{metric.utilization}%</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Avg Duration: <strong>{metric.avgBookingDuration}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Peak: <strong>{metric.peakHours}</strong>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

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
          This page displays static development data. In production, segment
          analysis will be derived from user and booking data from the analytics
          service.
        </Typography>
      </Paper>
    </Box>
  );
};
