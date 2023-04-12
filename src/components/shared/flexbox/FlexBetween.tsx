import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

const FlexBetween: FC<BoxProps> = ({ children, ...props }) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    {...props}
  >
    {children}
  </Box>
);

export default FlexBetween;
