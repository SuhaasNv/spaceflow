import { Box } from "@mui/material";
import { HeroSection } from "../components/home/HeroSection";
import { FeaturesSection } from "../components/home/FeaturesSection";
import { HowItWorksSection } from "../components/home/HowItWorksSection";
import { Footer } from "../components/home/Footer";
import { useAuth } from "../auth/useAuth";

export const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  // Use authentication state as key to force remount and restart animations
  // when navigating back to home page after logout
  return (
    <Box
      key={isAuthenticated ? "authenticated" : "public"}
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

