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
            flex: { xs: "1 1 auto", lg: "1 1 0" },
            minWidth: { lg: 320 },
            maxWidth: { lg: 600 }
          }}
        >
          <AiRecommendationsPanel />
        </Box>

        <Box sx={{ flex: { xs: "1 1 auto", lg: "1 1 0" } }}>
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
              About AI Recommendations
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary.light"
                  gutterBottom
                >
                  How it works
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  SpaceFlow AI analyzes booking patterns, occupancy data, and
                  usage trends to identify opportunities for optimization. Each
                  recommendation includes confidence levels and contributing
                  signals.
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary.light"
                  gutterBottom
                >
                  Advisory nature
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All recommendations are advisory-only and should not replace
                  your own judgment. They are designed to complement your
                  decision-making process with data-driven insights.
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="primary.light"
                  gutterBottom
                >
                  Confidence levels
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  High confidence recommendations are based on strong patterns
                  in the data. Medium and low confidence suggestions may
                  require additional validation before implementation.
                </Typography>
              </Box>
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
          This page displays AI recommendations from the AI Engine service. In
          production, recommendations will be generated based on real workspace
          data and updated dynamically.
        </Typography>
      </Paper>
    </Box>
  );
};
