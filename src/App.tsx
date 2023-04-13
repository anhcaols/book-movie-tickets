import { Direction, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';
import components from 'theme/components';
import { PaletteMode } from '@mui/material';

let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: { fontFamily: "'Montserrat', sans-serif" },
  palette: {
    mode: 'dark' as PaletteMode,
    primary: {
      main: '#ff55a5',
    },
  },
});
theme.components = components(theme);

function MainApp({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>{children}</main>
    </ThemeProvider>
  );
}

export default MainApp;
