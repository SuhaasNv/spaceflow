import { Box, Paper, Typography } from "@mui/material";
import { AiRecommendationsPanel } from "../components/AiRecommendationsPanel";

export const Recommendations = () => {
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
          Recommendations
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 520 }}
        >
          AI-powered insights and recommendations to optimize your workspace
          utilization. These suggestions are advisory and help you make
          data-driven decisions about space allocation and usage patterns.
        </Typography>
      </Box>

      <AiRecommendationsPanel />

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
          This page displays AI recommendations from the AI Engine service. In
          production, recommendations will be generated based on real workspace
          data and updated dynamically.
        </Typography>
      </Paper>
    </Box>
  );
};
