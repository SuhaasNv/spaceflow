import { Box, Paper, Typography } from "@mui/material";

export const Patterns = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Patterns
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
          Long-term occupancy and behavior patterns will appear here.
        </Typography>
      </Paper>
    </Box>
  );
};



