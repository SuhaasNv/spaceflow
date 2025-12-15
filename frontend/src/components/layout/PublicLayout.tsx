import { ReactNode } from "react";
import { Box } from "@mui/material";

type PublicLayoutProps = {
  children: ReactNode;
};

export const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
        // Dark-to-deep-blue gradient background
        background: `
          radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.12) 0%, transparent 50%),
          linear-gradient(180deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)
        `,
        backgroundSize: "200% 200%",
        backgroundPosition: "center",
        animation: "gradientShift 20s ease infinite",
        "@keyframes gradientShift": {
          "0%, 100%": {
            backgroundPosition: "center center"
          },
          "50%": {
            backgroundPosition: "60% 40%"
          }
        }
      }}
    >
      {children}
    </Box>
  );
};


