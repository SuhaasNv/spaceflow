import { ReactNode, useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerWidth = 260;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <TopBar onMenuClick={handleToggleSidebar} />

      <Sidebar
        drawerWidth={drawerWidth}
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop || mobileOpen}
        onClose={handleToggleSidebar}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};



