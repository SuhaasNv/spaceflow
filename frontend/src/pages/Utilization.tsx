import { Box, Paper, Typography } from "@mui/material";

export const Utilization = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Utilization
      </Typography>
      <Paper
        sx={{
          p: 3,
          minHeight: 240,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography color="text.secondary">
          Workspace utilization charts and metrics will appear here.
        </Typography>
      </Paper>
    </Box>
  );
};



