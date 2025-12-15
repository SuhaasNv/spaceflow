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
  // Desktop sidebar expanded / collapsed state (persists across route changes)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  // Mobile overlay drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isDesktop) {
      setIsSidebarExpanded((prev) => !prev);
    } else {
      setMobileOpen((prev) => !prev);
    }
  };

  const drawerWidth = 240;
  const collapsedDrawerWidth = 64;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100dvh", // Use dynamic viewport height
        bgcolor: "background.default",
        overflow: "hidden", // Prevent body scrollbars
        // Subtle radial background for overall app depth
        backgroundImage: (theme) =>
          `radial-gradient(circle at top left, rgba(99, 102, 241, 0.16), transparent 55%), radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.12), transparent 55%)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "140% 140%"
      }}
    >
      <TopBar
        onMenuClick={handleToggleSidebar}
        isSidebarOpen={isDesktop ? isSidebarExpanded : mobileOpen}
      />

      <Sidebar
        drawerWidth={drawerWidth}
        collapsedWidth={collapsedDrawerWidth}
        variant={isDesktop ? "permanent" : "temporary"}
        // For desktop we always keep the Drawer mounted and drive collapse via CSS.
        open={isDesktop ? true : mobileOpen}
        collapsed={isDesktop ? !isSidebarExpanded : false}
        onClose={handleToggleSidebar}
      />

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column", 
          width: "100%",
          minWidth: 0, // Prevent flex item from overflowing
          // Smooth transition when sidebar width changes
          transition: "margin-left 240ms cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden" // Prevent main content from causing scrollbars
        }}
      >
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            p: { xs: 2.5, md: 3.5 },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            overflowY: "auto",
            overflowX: "hidden",
            // Custom scrollbar styling
            "&::-webkit-scrollbar": {
              width: "8px"
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent"
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(148, 163, 184, 0.2)",
              borderRadius: "4px",
              "&:hover": {
                background: "rgba(148, 163, 184, 0.3)"
              }
            }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};



