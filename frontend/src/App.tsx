import { Box } from "@mui/material";
import { AppLayout } from "./components/layout/AppLayout";
import { AppRoutes } from "./routes/AppRoutes";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Box>
  );
};

export default App;



