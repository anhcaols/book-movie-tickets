import { Box, BoxProps } from "@mui/material";
import { FC } from "react";

const FlexRowAlign: FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" alignItems="center" justifyContent="center" {...props}>
    {children}
  </Box>
);

export default FlexRowAlign;
