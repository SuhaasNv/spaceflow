import { Box, Typography, Stack } from "@mui/material";
import { SectionContainer } from "../common/SectionContainer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const trustPoints = [
  {
    title: "API-first architecture",
    description: "Built for integration with your existing workplace systems."
  },
  {
    title: "Read-only analytics",
    description: "Your data remains secure. We analyze, never modify."
  },
  {
    title: "Advisory AI",
    description: "Insights are recommendations, never authoritative decisions."
  },
  {
    title: "Built for professionals",
    description: "Designed for facilities teams and workplace strategists."
  }
];

export const HowItWorksSection = () => {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        py: { xs: 10, md: 16 },
        bgcolor: "transparent",
        // Subtle background variation
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 70%)
          `,
          pointerEvents: "none"
        }
      }}
    >
      <SectionContainer>
        <Box
          sx={{
            maxWidth: "900px",
            mx: "auto",
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
              mb: 3
            }}
          >
            Trust & Architecture
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "text.secondary",
              mb: { xs: 6, md: 8 },
              lineHeight: 1.7
            }}
          >
            SpaceFlow is designed with enterprise security and transparency at its core. Our platform provides insights without compromising your data or decision-making autonomy.
          </Typography>

          <Stack spacing={3} sx={{ textAlign: "left" }}>
            {trustPoints.map((point, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  gap: 2.5,
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  bgcolor: "rgba(15, 23, 42, 0.3)",
                  border: "1px solid",
                  borderColor: "rgba(148, 163, 184, 0.1)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  "&:hover": {
                    borderColor: "rgba(74, 222, 128, 0.25)",
                    bgcolor: "rgba(15, 23, 42, 0.4)"
                  }
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    mt: 0.5,
                    color: "primary.main"
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontSize: { xs: "1.125rem", md: "1.25rem" },
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 1
                    }}
                  >
                    {point.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      color: "text.secondary",
                      lineHeight: 1.6
                    }}
                  >
                    {point.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </SectionContainer>
    </Box>
  );
};





