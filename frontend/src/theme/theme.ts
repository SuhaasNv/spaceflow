import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E88E5"
    },
    secondary: {
      main: "#00897B"
    },
    background: {
      default: "#F4F6F8",
      paper: "#FFFFFF"
    }
  },
  typography: {
    fontFamily: [
      "Inter",
      "system-ui",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "sans-serif"
    ].join(",")
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "none"
        }
      }
    }
  }
});



