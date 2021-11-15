import {
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';

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
        <Routes>
          <Route path="/" element={<Typography>TODO!</Typography>} />
          <Route
            path="*"
            element={
              <Typography align="center" variant="h3">
                Not found!
              </Typography>
            }
          />
        </Routes>
      </Content>
    </ThemeProvider>
  );
};
