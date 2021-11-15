import {
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { AppBar, Content } from './components';
import { getThemedComponents, getThemeOptions } from './config';

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';
  const initial = createTheme(getThemeOptions(mode));
  const theme = { ...initial, ...getThemedComponents(initial) };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar title="Usufruct" />
      <Content>
        <Typography align="center" variant="h3">
          TODO!
        </Typography>
      </Content>
    </ThemeProvider>
  );
};
