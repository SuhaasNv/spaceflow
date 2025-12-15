import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type TopBarProps = {
  onMenuClick: () => void;
};

export const TopBar = ({ onMenuClick }: TopBarProps) => {
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper"
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 1, display: { md: "none" } }}
            aria-label="open navigation"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            SpaceFlow
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar sx={{ width: 32, height: 32 }}>SF</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};



