import {
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AppLayout,
  DocumentHead,
  NotFound,
  Spinner,
  Toasts,
} from './components';
import { getThemedComponents, getThemeOptions } from './config';

const AppHome = React.lazy(() => import('./routes/app-home'));
const LibraryHome = React.lazy(() => import('./routes/library-home'));
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
      <DocumentHead />
      <CssBaseline />
      <React.Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<AppHome />} />
            <Route path="l/:slug" element={<LibraryHome />}>
              <Route index element={<Typography>Test</Typography>} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="inventory/:id" element={<ItemView />} />
            </Route>
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
