import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

export interface ResponsiveDialogProps extends Omit<DialogProps, 'open'> {
  title: string;
  onClose: () => void;
  children: React.ReactChild;
}

export const ResponsiveDialog = (props: ResponsiveDialogProps) => {
  const { title, onClose, fullScreen, children, ...rest } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={true} fullScreen={isMobile || fullScreen} {...rest}>
      <AppBar color="default">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography noWrap variant="h6">
            {title}
          </Typography>
          <IconButton color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
