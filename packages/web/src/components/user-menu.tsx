import { Box, Button, CircularProgress } from '@mui/material';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import { useStores } from '../hooks';
import { AuthStatus } from '../stores';

export const UserMenu = observer(() => {
  const { auth } = useStores();

  if (
    auth.status === AuthStatus.Authenticating ||
    auth.status === AuthStatus.Initializing
  ) {
    return <CircularProgress />;
  }

  if (auth.authenticated) {
    return (
      <Button variant="text" color="inherit" onClick={() => auth.logout()}>
        Log out
      </Button>
    );
  }

  return (
    <Box>
      <Button
        component={RouterLink}
        to="/login"
        variant="text"
        color="inherit"
        sx={{ marginRight: 1 }}
      >
        Login
      </Button>
      <Button component={RouterLink} to="/sign-up" variant="contained">
        Sign Up
      </Button>
    </Box>
  );
});
