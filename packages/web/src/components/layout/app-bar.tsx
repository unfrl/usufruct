import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

export interface IAppBarProps {
  title: string;
}

export const AppBar: React.FC<IAppBarProps> = (props) => {
  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div">
          {props.title}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};
