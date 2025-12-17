import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

type SectionContainerProps = BoxProps & {
  children: ReactNode;
};

export const SectionContainer = ({ children, sx, ...props }: SectionContainerProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1280px",
        mx: "auto",
        px: { xs: 3, sm: 4, md: 5 },
        ...sx
      }}
      {...props}
    >
      {children}
    </Box>
  );
};






