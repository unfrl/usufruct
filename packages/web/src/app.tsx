import {
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppLayout, Spinner, Toasts } from './components';
import { getThemedComponents, getThemeOptions } from './config';

const Authentication = React.lazy(() => import('./routes/authentication'));
const Verification = React.lazy(() => import('./routes/verification'));
const Inventory = React.lazy(() => import('./routes/inventory'));

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';
  const initial = createTheme(getThemeOptions(mode));
  const theme = { ...initial, ...getThemedComponents(initial) };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Link to="inventory">Admin inventory UI</Link>}
            />
            <Route path="inventory" element={<Inventory />} />
            <Route
              path="*"
              element={
                <Typography align="center" variant="h3">
                  Not found!
                </Typography>
              }
            />
          </Route>
          <Route path="sign-up" element={<Authentication signUp={true} />} />
          <Route path="login" element={<Authentication signUp={false} />} />
          <Route path="verification" element={<Verification />} />
        </Routes>
      </React.Suspense>
      <Toasts />
    </ThemeProvider>
  );
};
