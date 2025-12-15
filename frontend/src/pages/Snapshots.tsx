import { Box, Paper, Typography, Grid, Chip, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";

// Static snapshot data for development
const snapshots = [
  {
    id: "snapshot-1",
    timestamp: "2024-01-15T14:30:00Z",
    date: "Jan 15, 2024",
    time: "2:30 PM",
    totalSpaces: 45,
    occupiedSpaces: 32,
    utilization: 71,
    activeBookings: 28,
    peakArea: "Meeting Rooms - Floor 3"
  },
  {
    id: "snapshot-2",
    timestamp: "2024-01-15T10:15:00Z",
    date: "Jan 15, 2024",
    time: "10:15 AM",
    totalSpaces: 45,
    occupiedSpaces: 38,
    utilization: 84,
    activeBookings: 35,
    peakArea: "Desk Spaces - Floor 2"
  },
  {
    id: "snapshot-3",
    timestamp: "2024-01-14T16:45:00Z",
    date: "Jan 14, 2024",
    time: "4:45 PM",
    totalSpaces: 45,
    occupiedSpaces: 25,
    utilization: 56,
    activeBookings: 22,
    peakArea: "Collaboration Areas - Floor 1"
  },
  {
    id: "snapshot-4",
    timestamp: "2024-01-14T09:00:00Z",
    date: "Jan 14, 2024",
    time: "9:00 AM",
    totalSpaces: 45,
    occupiedSpaces: 18,
    utilization: 40,
    activeBookings: 15,
    peakArea: "Quiet Zones - Floor 4"
  },
  {
    id: "snapshot-5",
    timestamp: "2024-01-13T13:20:00Z",
    date: "Jan 13, 2024",
    time: "1:20 PM",
    totalSpaces: 45,
    occupiedSpaces: 35,
    utilization: 78,
    activeBookings: 31,
    peakArea: "Meeting Rooms - Floor 3"
  },
  {
    id: "snapshot-6",
    timestamp: "2024-01-12T11:30:00Z",
    date: "Jan 12, 2024",
    time: "11:30 AM",
    totalSpaces: 45,
    occupiedSpaces: 41,
    utilization: 91,
    activeBookings: 38,
    peakArea: "Desk Spaces - Floor 2"
  }
];

const getUtilizationColor = (utilization: number) => {
  if (utilization >= 80) return "error";
  if (utilization >= 60) return "warning";
  return "success";
};

const getUtilizationLabel = (utilization: number) => {
  if (utilization >= 80) return "High";
  if (utilization >= 60) return "Moderate";
  return "Low";
};

export const Snapshots = () => {
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
          Snapshots
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          Point-in-time workspace snapshots capture utilization at specific
          moments. Review historical snapshots to understand usage patterns and
          identify trends.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {snapshots.map((snapshot) => (
          <Grid item xs={12} md={6} lg={4} key={snapshot.id}>
            <Paper
              sx={(theme) => ({
                p: 3,
                borderRadius: 2.5,
                bgcolor: "rgba(15, 23, 42, 0.92)",
                border: `1px solid ${theme.palette.divider}`,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                transition: theme.transitions.create(
                  ["box-shadow", "transform", "border-color"],
                  {
                    duration: theme.transitions.duration.short
                  }
                ),
                "&:hover": {
                  boxShadow:
                    "0 0 0 1px rgba(74, 222, 128, 0.6), 0 14px 30px rgba(15, 23, 42, 0.95)",
                  transform: "translateY(-2px)",
                  borderColor: theme.palette.primary.light
                }
              })}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 1
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75
                    }}
                  >
                    <AccessTimeIcon fontSize="small" color="action" />
                    <Typography variant="subtitle2" fontWeight={600}>
                      {snapshot.date}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {snapshot.time}
                  </Typography>
                </Box>
                <Chip
                  label={getUtilizationLabel(snapshot.utilization)}
                  color={getUtilizationColor(snapshot.utilization)}
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  pt: 1,
                  borderTop: (theme) => `1px solid ${theme.palette.divider}`
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Utilization
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {snapshot.utilization}%
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Occupied Spaces
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {snapshot.occupiedSpaces} / {snapshot.totalSpaces}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <PeopleIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Active Bookings
                    </Typography>
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {snapshot.activeBookings}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 0.75,
                    pt: 1,
                    borderTop: (theme) => `1px solid ${theme.palette.divider}`
                  }}
                >
                  <LocationOnIcon fontSize="small" color="action" />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mb: 0.25 }}
                    >
                      Peak Area
                    </Typography>
                    <Typography variant="body2" noWrap>
                      {snapshot.peakArea}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Button
                variant="outlined"
                size="small"
                fullWidth
                sx={{ mt: 1 }}
              >
                View Details
              </Button>
            </Paper>
          </Grid>
        ))}
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
          This page displays static development data. In production, snapshots
          will be captured at regular intervals from the occupancy and analytics
          services, providing historical point-in-time views of workspace
          utilization.
        </Typography>
      </Paper>
    </Box>
  );
};
