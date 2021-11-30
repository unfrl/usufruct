import { AppBar, Link, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { Link as RouterLink } from 'react-router-dom';
import { UserMenu } from '../user-menu';

export interface AppHeaderProps {
  title: string;
  titleLink?: string;
}

export const AppHeader = observer((props: AppHeaderProps) => {
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
    <AppBar position="sticky">
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
    </AppBar>
  );
});
