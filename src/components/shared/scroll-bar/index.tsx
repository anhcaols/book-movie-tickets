import { alpha, styled } from "@mui/material";
import { SxProps } from "@mui/system";
import { ReactNode } from "react";
import SimpleBar, { Props } from "simplebar-react";

const StyledScrollBar = styled(SimpleBar)(({ theme }) => ({
  maxHeight: "100%",
  "& .simplebar-scrollbar": {
    "&:before": { backgroundColor: alpha(theme.palette.grey[400], 0.6) },
    "&.simplebar-visible:before": { opacity: 1 },
  },
  "& .simplebar-track.simplebar-vertical": { width: 9 },
  "& .simplebar-track.simplebar-horizontal .simplebar-scrollbar": { height: 6 },
  "& .simplebar-mask": { zIndex: "inherit" },
}));

// props type
type ScrollbarProps = { children: ReactNode; sx?: SxProps };

const Scrollbar = ({ children, sx, ...props }: ScrollbarProps & Props) => {
  return (
    <StyledScrollBar sx={sx} {...props}>
      {children}
    </StyledScrollBar>
  );
};

export default Scrollbar;
