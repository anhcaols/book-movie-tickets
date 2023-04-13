import { Theme } from "@mui/material";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const lightTheme = (theme: Theme) => theme.palette.mode === "light";

export const secondarySideBarWidth = 215;
export const secondarySideBarGap = 80;
