import { AppBar as MuiAppBar, Link, Toolbar, Typography } from '@mui/material';
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
      <Toolbar>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
