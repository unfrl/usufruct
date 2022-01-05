import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useStores } from '../../hooks';
import { AuthStatus } from '../../stores';
import { getInitials } from '../../utils';

export const UserMenu = observer(() => {
  const { auth } = useStores();
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>();

  const handleShowMenu = (e: React.MouseEvent) => {
    setAnchorEl(e.currentTarget);
  };

  const handleHideMenu = () => {
    setAnchorEl(undefined);
  };

  if (
    auth.status === AuthStatus.Authenticating ||
    auth.status === AuthStatus.Initializing
  ) {
    return <CircularProgress />;
  }

  if (!auth.authenticated || !auth.user) {
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
  }

  return (
    <Box>
      <Tooltip title="User menu">
        <IconButton onClick={handleShowMenu} size="small">
          <Avatar>{getInitials(auth.user.displayName)}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleHideMenu}
      >
        <MenuItem onClick={auth.logout}>Log out</MenuItem>
      </Menu>
    </Box>
  );
});
