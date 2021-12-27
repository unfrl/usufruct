import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppLayout, NotFound, Spinner, Toasts } from './components';
import { getThemedComponents, getThemeOptions } from './config';

const Home = React.lazy(() => import('./routes/home'));
const Authentication = React.lazy(() => import('./routes/authentication'));
const Verification = React.lazy(() => import('./routes/verification'));
const Inventory = React.lazy(() => import('./routes/inventory'));
const ItemView = React.lazy(() => import('./routes/item-view'));

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
            <Route index element={<Home />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="inventory/:id" element={<ItemView />} />
            <Route path="*" element={<NotFound />} />
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
