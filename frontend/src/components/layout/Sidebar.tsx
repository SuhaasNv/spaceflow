import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsightsIcon from "@mui/icons-material/Insights";
import TimelineIcon from "@mui/icons-material/Timeline";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import GroupsIcon from "@mui/icons-material/Groups";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  drawerWidth: number;
  collapsedWidth?: number;
  variant: "permanent" | "temporary";
  open: boolean;
  onClose: () => void;
  collapsed?: boolean;
};

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/", icon: <DashboardIcon /> },
  { label: "Utilization", path: "/utilization", icon: <InsightsIcon /> },
  { label: "Booking Usage", path: "/booking-usage", icon: <TimelineIcon /> },
  { label: "Recommendations", path: "/recommendations", icon: <ViewQuiltIcon /> },
  { label: "Patterns", path: "/patterns", icon: <ViewQuiltIcon /> },
  { label: "Segments", path: "/segments", icon: <GroupsIcon /> },
  { label: "Snapshots", path: "/snapshots", icon: <CameraAltIcon /> }
];

export const Sidebar = ({
  drawerWidth,
  collapsedWidth = 64,
  variant,
  open,
  onClose,
  collapsed = false
}: SidebarProps) => {
  // Fixed widths: expanded 240px, collapsed 64px
  const EXPANDED_WIDTH = drawerWidth;
  const COLLAPSED_WIDTH = collapsedWidth;
  const currentWidth = collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  const content = (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        // No transforms - content adapts to drawer width
      }}
    >
      <Toolbar />
      <Box 
        sx={{ 
          flex: 1, 
          overflowY: "auto",
          overflowX: "hidden",
          // Hide scrollbar completely when collapsed
          "&::-webkit-scrollbar": {
            width: collapsed ? 0 : "6px"
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(148, 163, 184, 0.2)",
            borderRadius: "3px",
            "&:hover": {
              background: "rgba(148, 163, 184, 0.3)"
            }
          }
        }}
      >
        <List
          sx={{
            px: collapsed ? 0 : 0.75,
            pt: 1.5,
            pb: 0.75
          }}
        >
          {navItems.map((item) => {
            const navButton = (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                onClick={variant === "temporary" ? onClose : undefined}
                aria-label={item.label}
                sx={(theme) => ({
                  borderRadius: collapsed ? 0 : 999,
                  mb: collapsed ? 0 : 0.75,
                  px: collapsed ? 0 : 1.5,
                  py: collapsed ? 0 : 0.5,
                  minHeight: 44,
                  minWidth: 44,
                  width: collapsed ? "100%" : "auto",
                  justifyContent: collapsed ? "center" : "flex-start",
                  position: "relative",
                  transition: theme.transitions.create(
                    [
                      "background-color",
                      "box-shadow",
                      "padding",
                      "justify-content",
                      "border-radius",
                      "margin-bottom"
                    ],
                    {
                      duration: 240,
                      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
                    }
                  ),
                  // Icon styling - ensure 44px hit area, always visible
                  "& .MuiListItemIcon-root": {
                    minWidth: collapsed ? COLLAPSED_WIDTH : 36,
                    width: collapsed ? COLLAPSED_WIDTH : "auto",
                    height: 44,
                    color: theme.palette.text.secondary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: theme.transitions.create(["color"], {
                      duration: 240,
                      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
                    })
                  },
                  // Text styling - fade out smoothly, no transform
                  "& .MuiListItemText-primary": {
                    fontSize: "0.88rem",
                    letterSpacing: "0.03em",
                    fontWeight: 500,
                    opacity: collapsed ? 0 : 1,
                    width: collapsed ? 0 : "auto",
                    maxWidth: collapsed ? 0 : "none",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    transition: theme.transitions.create(
                      ["opacity", "width", "max-width"],
                      {
                        duration: 240,
                        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
                      }
                    ),
                    pointerEvents: collapsed ? "none" : "auto"
                  },
                  // Hover state
                  "&:hover": {
                    bgcolor: collapsed 
                      ? "rgba(255, 255, 255, 0.06)" 
                      : "rgba(255, 255, 255, 0.04)",
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.text.primary
                    }
                  },
                  // Active state styling
                  "&.active": {
                    bgcolor: collapsed
                      ? "transparent"
                      : "rgba(15, 23, 42, 0.82)",
                    boxShadow: collapsed
                      ? "none"
                      : "0 18px 45px rgba(15, 23, 42, 0.8), 0 0 0 1px rgba(30, 64, 175, 0.8)",
                    transform: collapsed ? "none" : "translateX(2px)",
                    backdropFilter: collapsed ? "none" : "blur(18px)",
                    // When collapsed: vertical accent bar
                    ...(collapsed && {
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 28,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: "0 2px 2px 0",
                        zIndex: 1,
                        boxShadow: `0 0 8px ${theme.palette.primary.main}40, 0 0 16px ${theme.palette.primary.main}20`
                      }
                    }),
                    "& .MuiListItemIcon-root": {
                      color: theme.palette.primary.light,
                      position: "relative",
                      zIndex: 2
                    },
                    "& .MuiListItemText-primary": {
                      color: theme.palette.text.primary,
                      fontWeight: 600
                    }
                  },
                  // Keyboard accessibility
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: theme.palette.primary.main,
                    outlineOffset: 2,
                    zIndex: 10
                  }
                })}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    noWrap: true
                  }}
                />
              </ListItemButton>
            );

            // Wrap with tooltip when collapsed
            if (collapsed) {
              return (
                <Tooltip
                  key={item.path}
                  title={item.label}
                  placement="right"
                  arrow
                  enterDelay={300}
                  leaveDelay={0}
                >
                  {navButton}
                </Tooltip>
              );
            }

            return navButton;
          })}
        </List>
      </Box>
      {collapsed && (
        <Divider
          orientation="vertical"
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 1,
            bgcolor: "rgba(148, 163, 184, 0.12)",
            border: "none",
            pointerEvents: "none"
          }}
        />
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: currentWidth },
        flexShrink: { md: 0 },
        // Smooth width transition for layout
        transition: "width 240ms cubic-bezier(0.4, 0, 0.2, 1)"
      }}
      aria-label="main navigation"
    >
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "block" },
          "& .MuiDrawer-paper": {
            width: currentWidth,
            boxSizing: "border-box",
            overflow: "hidden",
            height: "100dvh",
            backgroundImage:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.96))",
            borderRight: collapsed
              ? "1px solid rgba(148, 163, 184, 0.12)"
              : "1px solid rgba(148, 163, 184, 0.16)",
            // Smooth width transition
            transition: "width 240ms cubic-bezier(0.4, 0, 0.2, 1), border-color 240ms cubic-bezier(0.4, 0, 0.2, 1)",
            pointerEvents: "auto"
          }
        }}
      >
        {content}
      </Drawer>
    </Box>
  );
};



