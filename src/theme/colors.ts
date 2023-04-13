import { alpha } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {
    100: string;
    200: string;
    300: string;
    400: string;
    red?: string;
    purple?: string;
    yellow?: string;
  }
}

const primaryMain = "#2499EF";
export const primary = {
  light: "#E5F3FD",
  main: primaryMain,
  100: alpha(primaryMain, 0.08),
  200: alpha(primaryMain, 0.2),
  300: alpha(primaryMain, 0.3),
  400: alpha(primaryMain, 0.4),
  red: "#FF6B93",
  purple: "#A798FF",
  yellow: "#FF9777",
};

const secondaryMain = "#23C657";

export const secondary = {
  light: "#E3F0FF",
  main: secondaryMain,
  dark: "#011E3D",
  100: alpha(secondaryMain, 0.08),
  200: alpha(secondaryMain, 0.2),
  300: alpha(secondaryMain, 0.3),
  400: alpha(secondaryMain, 0.4),
};

export const info = {
  light: "#F4F4FF",
  main: "#8C8DFF",
  dark: "#0C53B7",
};
export const success = {
  light: "#EAFBF4",
  main: "#27CE88",
  dark: "#229A16",
};
export const warning = {
  light: "#FFFAF2",
  main: "#FFC675",
  dark: "#B78103",
};
export const error = {
  light: "#FFEBF1",
  main: "#FF316F",
  dark: "#B72136",
};

// For light theme
export const greyLight = {
  50: "#f9f9f9",
  100: "#eff3f5",
  200: "#D3E6F3",
  300: "#B1C9DC",
  400: "#8CA3BA",
  500: "#5F748D",
  600: "#455A79",
  700: "#2F4365",
  800: "#1E2E51",
  900: "#121F43",
};

// For dark theme
export const greyDark = {
  900: "#E9F3F9",
  800: "#D3E6F3",
  700: "#B1C9DC",
  600: "#8CA3BA",
  500: "#5F748D",
  400: "#455A79",
  300: "#2F4365",
  200: "#1E2E51",
  100: "#121F43",
  50: "#111111",
};

// For Light theme
export const textLight = {
  primary: greyLight[900],
  secondary: greyLight[500],
  disabled: greyLight[400],
};

// For Dark theme
export const textDark = {
  primary: "#ffffff",
  secondary: greyDark[600],
  disabled: greyDark[400],
};

// For Light theme
export const actionLight = {
  activatedOpacity: 0.12,
  active: alpha(greyLight[900], 0.54),
  disabled: greyLight[300],
  disabledBackground: alpha(greyLight[900], 0.12),
  disabledOpacity: 0.38,
  focus: alpha(greyLight[900], 0.12),
  focusOpacity: 0.12,
  hover: alpha(greyLight[900], 0.04),
  hoverOpacity: 0.04,
  selected: greyLight[100],
  selectedOpacity: 0.08,
};

// Common colors
const palette = {
  info,
  error,
  primary,
  success,
  warning,
  secondary,
};

export const lightPalette = {
  ...palette,
  mode: "light",
  grey: greyLight,
  text: textLight,
  action: actionLight,
  divider: greyLight[200],
  background: { default: "#f3f4f9", paper: "#ffffff" },
};

export const darkPalette = {
  ...palette,
  mode: "dark",
  grey: greyDark,
  text: textDark,
  background: { default: "#171c24", paper: "#222b36" },
};
