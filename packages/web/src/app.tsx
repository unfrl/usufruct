import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { getThemedComponents, getThemeOptions } from './config';

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';
  const initial = createTheme(getThemeOptions(mode));
  const theme = { ...initial, ...getThemedComponents(initial) };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography>app.tsx</Typography>
        <Button
          color="primary"
          variant="contained"
          size="small"
          sx={{ marginTop: 1 }}
        >
          Sample Button
        </Button>
      </Box>
    </ThemeProvider>
  );
};
