import { Box, Paper, Typography } from "@mui/material";

export const Recommendations = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Recommendations
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
          AI-driven workplace recommendations will appear here.
        </Typography>
      </Paper>
    </Box>
  );
};



