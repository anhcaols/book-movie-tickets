import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PropsWithChildren } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MainApp({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>{children}</main>
    </ThemeProvider>
  );
}

export default MainApp;
