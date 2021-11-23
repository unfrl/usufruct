import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface AppBarProps {
  title: string;
  titleLink?: string;
}

export const AppBar = (props: AppBarProps) => {
  const title = props.titleLink ? (
    <Link
      component={RouterLink}
      to={props.titleLink}
      style={{ color: 'inherit' }}
    >
      {props.title}
    </Link>
  ) : (
    props.title
  );

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
          {title}
        </Typography>
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
      </Toolbar>
    </MuiAppBar>
  );
};
