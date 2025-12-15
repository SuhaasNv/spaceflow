import { Box, Paper, Typography } from "@mui/material";

export const Snapshots = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Snapshots
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
          Point-in-time workspace snapshots will appear here.
        </Typography>
      </Paper>
    </Box>
  );
};



