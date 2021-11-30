import { AppBar as MuiAppBar, Link, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import { UserMenu } from '../user-menu';

export interface AppBarProps {
  title: string;
  titleLink?: string;
}

export const AppBar = observer((props: AppBarProps) => {
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
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
});
