import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type TopBarProps = {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
};

export const TopBar = ({ onMenuClick, isSidebarOpen }: TopBarProps) => {
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
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 0.75,
              py: 0.25,
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
                width: 32,
                height: 32,
                fontSize: 14
              }}
            >
              SF
            </Avatar>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              Workspace Admin
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};



