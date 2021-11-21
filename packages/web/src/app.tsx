import {
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './components';
import { getThemedComponents, getThemeOptions } from './config';

const SignUp = React.lazy(() => import('./routes/sign-up'));

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';
  const initial = createTheme(getThemeOptions(mode));
  const theme = { ...initial, ...getThemedComponents(initial) };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense fallback={<Typography>Loading...</Typography>}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Typography>TODO!</Typography>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="*"
              element={
                <Typography align="center" variant="h3">
                  Not found!
                </Typography>
              }
            />
          </Route>
        </Routes>
      </React.Suspense>
    </ThemeProvider>
  );
};
