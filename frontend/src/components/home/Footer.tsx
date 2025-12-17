import { Box, Typography } from "@mui/material";
import { SectionContainer } from "../common/SectionContainer";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        py: { xs: 6, md: 8 },
        borderTop: "1px solid",
        borderColor: "rgba(148, 163, 184, 0.1)",
        bgcolor: "transparent"
      }}
    >
      <SectionContainer>
        <Box
          sx={{
            textAlign: "center"
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "0.875rem", md: "0.9375rem" },
              color: "text.secondary",
              fontWeight: 500,
              letterSpacing: "0.02em"
            }}
          >
            SpaceFlow – Smart Workspace Intelligence
          </Typography>
        </Box>
      </SectionContainer>
    </Box>
  );
};




