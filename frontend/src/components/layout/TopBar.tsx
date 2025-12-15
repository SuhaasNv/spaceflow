import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

type TopBarProps = {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
};

export const TopBar = ({ onMenuClick, isSidebarOpen }: TopBarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    handleClose();
  };

  // Get user initials from email (first letter of local part and domain)
  const getInitials = (email: string) => {
    const localPart = email.split("@")[0];
    const domainPart = email.split("@")[1]?.[0] || "";
    return (localPart[0]?.toUpperCase() || "") + (domainPart.toUpperCase() || "").slice(0, 1);
  };

  if (!user) {
    return null;
  }

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={(theme) => ({
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        borderRadius: 0, // Sharp rectangular edges
        // Subtle gradient + shadow to separate header from dark canvas
        backgroundImage:
          "linear-gradient(to bottom, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.96))",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.85)",
        // Ensure the top bar (and hamburger) sit above the permanent sidebar drawer
        zIndex: theme.zIndex.drawer + 1,
        "&::after": {
          content: '""',
          position: "absolute",
          inset: "auto 0 -18px",
          height: 18,
          background:
            "linear-gradient(to bottom, rgba(15, 23, 42, 0.9), transparent)",
          pointerEvents: "none"
        }
      })}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", borderRadius: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={(theme) => ({
              mr: 1,
              display: "inline-flex",
              color: theme.palette.text.primary,
              bgcolor: "transparent",
              borderRadius: 1.5,
              width: 40, // Fixed width to prevent layout shifts
              height: 40, // Fixed height to prevent layout shifts
              minWidth: 40, // Ensure minimum size
              transition: theme.transitions.create(
                ["background-color", "box-shadow"],
                {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeOut
                }
              ),
              // Prevent transform on hover to avoid position shifts
              "&:hover": {
                bgcolor: "rgba(148, 163, 184, 0.12)",
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.55)"
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: theme.palette.primary.main,
                outlineOffset: 2
              }
            })}
            aria-label="Toggle navigation"
            aria-pressed={isSidebarOpen}
          >
            <Box
              sx={(theme) => ({
                position: "relative",
                width: 24,
                height: 24,
                "& svg": {
                  position: "absolute",
                  inset: 0,
                  transition: theme.transitions.create(
                    ["opacity", "transform"],
                    {
                      duration: 220,
                      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
                    }
                  )
                }
              })}
            >
              <MenuIcon
                sx={{
                  opacity: isSidebarOpen ? 0 : 1,
                  transform: isSidebarOpen
                    ? "rotate(90deg) scale(0.8)"
                    : "rotate(0deg) scale(1)"
                }}
              />
              <CloseIcon
                sx={{
                  opacity: isSidebarOpen ? 1 : 0,
                  transform: isSidebarOpen
                    ? "rotate(0deg) scale(1)"
                    : "rotate(-90deg) scale(0.8)"
                }}
              />
            </Box>
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              minWidth: 0
            }}
          >
            {/* Uses /public/spaceflow-logo.png.jpg as the brand logo asset */}
            <Box
              component="img"
              src="/spaceflow-logo.jpg"
              alt="SpaceFlow logo"
              sx={{
                height: 32,
                width: "auto",
                display: "block"
              }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 0.25,
                fontWeight: 600,
                letterSpacing: "-0.03em"
              }}
            >
              SpaceFlow
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            onClick={handleClick}
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              px: 1,
              py: 0.5,
              borderRadius: 999,
              bgcolor: "transparent",
              cursor: "pointer",
              transition: theme.transitions.create(
                ["background-color", "box-shadow", "transform"],
                {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeOut
                }
              ),
              "&:hover": {
                backgroundColor: "rgba(148, 163, 184, 0.16)",
                boxShadow:
                  "0 0 0 1px rgba(148, 163, 184, 0.45), 0 12px 26px rgba(15, 23, 42, 0.9)",
                transform: "translateY(-1px)"
              }
            })}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                fontSize: 14,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                flexShrink: 0
              }}
            >
              {getInitials(user.email)}
            </Avatar>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                minWidth: 0,
                gap: 0.25
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px"
                }}
              >
                {user.email}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "200px"
                }}
              >
                {user.role}
              </Typography>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            PaperProps={{
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                boxShadow: (theme) => (theme as any).customShadows?.subtleGlow || "0 18px 45px rgba(15, 23, 42, 0.7)"
              }
            }}
          >
            <MenuItem disabled>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {user.email}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.role}
                </Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};



