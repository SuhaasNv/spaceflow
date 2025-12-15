import { Box, Paper, Typography } from "@mui/material";

export const Segments = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Segments
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
          Workplace user and space segments will appear here.
        </Typography>
      </Paper>
    </Box>
  );
};



