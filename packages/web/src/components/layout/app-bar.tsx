import {
  AppBar as MuiAppBar,
  Box,
  Button,
  CircularProgress,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import { useStores } from '../../hooks';
import { AuthStatus } from '../../stores';

export interface AppBarProps {
  title: string;
  titleLink?: string;
}

export const AppBar = observer((props: AppBarProps) => {
  const { auth } = useStores();

  const title = () => {
    if (props.titleLink) {
      return (
        <Link
          component={RouterLink}
          to={props.titleLink}
          sx={{ color: 'inherit' }}
        >
          {props.title}
        </Link>
      );
    }

    return props.title;
  };

  const options = () => {
    if (
      auth.status === AuthStatus.Authenticating ||
      auth.status === AuthStatus.Initializing
    ) {
      return <CircularProgress />;
    }

    // TODO: if authenticated, display user menu

    return (
      <Box>
        <Button
          component={RouterLink}
          to="/sign-in"
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
  };

  return (
    <MuiAppBar position="sticky">
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" component="div">
          {title()}
        </Typography>
        {options()}
      </Toolbar>
    </MuiAppBar>
  );
});
