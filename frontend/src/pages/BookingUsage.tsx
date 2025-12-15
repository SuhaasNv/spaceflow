import { Box, Paper, Typography } from "@mui/material";

export const BookingUsage = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4" gutterBottom>
        Booking Usage
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
          Booking patterns and room usage analytics will appear here.
        </Typography>
      </Paper>
    </Box>
  );
};



