import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
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
  variant: "permanent" | "temporary";
  open: boolean;
  onClose: () => void;
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

export const Sidebar = ({ drawerWidth, variant, open, onClose }: SidebarProps) => {
  const content = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Box sx={{ px: 2, pb: 1 }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 0.5 }}
        >
          Navigation
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={variant === "temporary" ? onClose : undefined}
              sx={{
                "&.active": {
                  bgcolor: "action.selected"
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
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
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
      >
        {content}
      </Drawer>
    </Box>
  );
};



