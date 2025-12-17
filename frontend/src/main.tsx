import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import { spaceFlowDarkTheme } from "./theme/theme";
import { AuthProvider } from "./context/AuthContext";

if (import.meta.env.DEV) {
  // Helpful wiring check in development.
  // eslint-disable-next-line no-console
  console.log("Auth API base URL:", import.meta.env.VITE_AUTH_API_BASE_URL);
  // eslint-disable-next-line no-console
  console.log(
    "Analytics API base URL:",
    import.meta.env.VITE_ANALYTICS_API_BASE_URL
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={spaceFlowDarkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);



