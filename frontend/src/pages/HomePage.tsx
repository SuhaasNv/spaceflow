import { Box } from "@mui/material";
import { HeroSection } from "../components/home/HeroSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { Footer } from "../components/home/Footer";

export const HomePage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden"
      }}
    >
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </Box>
  );
};

