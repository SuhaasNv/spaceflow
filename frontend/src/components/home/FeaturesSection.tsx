import { Box, Typography, Grid } from "@mui/material";
import { SectionContainer } from "../common/SectionContainer";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PsychologyIcon from "@mui/icons-material/Psychology";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const features = [
  {
    icon: AnalyticsIcon,
    title: "Space Utilization Analytics",
    description: "Real-time insights into how your workspace is actually being used."
  },
  {
    icon: EventSeatIcon,
    title: "Booking vs Actual Usage",
    description: "Compare planned bookings against actual occupancy patterns."
  },
  {
    icon: PsychologyIcon,
    title: "Behavioral & Usage Patterns",
    description: "Identify trends and understand how teams interact with space."
  },
  {
    icon: LightbulbIcon,
    title: "AI Advisory Insights",
    description: "Non-authoritative recommendations to guide workplace optimization decisions."
  }
];

export const FeaturesSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: "transparent"
      }}
    >
      <SectionContainer>
        <Box
          sx={{
            mb: { xs: 6, md: 10 },
            textAlign: "center"
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "text.primary",
              mb: 2
            }}
          >
            Core Capabilities
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "text.secondary",
              maxWidth: "600px",
              mx: "auto"
            }}
          >
            Enterprise-grade analytics and insights for facilities teams and workplace strategists.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 4, md: 6 }}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 3,
                    bgcolor: "rgba(15, 23, 42, 0.4)",
                    border: "1px solid",
                    borderColor: "rgba(148, 163, 184, 0.12)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      borderColor: "rgba(74, 222, 128, 0.3)",
                      boxShadow: "0 12px 40px rgba(15, 23, 42, 0.6), 0 0 0 1px rgba(74, 222, 128, 0.1)"
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: "rgba(74, 222, 128, 0.1)",
                      mb: 2.5,
                      color: "primary.main"
                    }}
                  >
                    <IconComponent sx={{ fontSize: { xs: 28, md: 32 } }} />
                  </Box>
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.25rem", md: "1.5rem" },
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 1.5
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      color: "text.secondary",
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </SectionContainer>
    </Box>
  );
};


