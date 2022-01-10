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

export interface ResponsiveDialogProps extends DialogProps {
  title: string;
  onClose: () => void;
  children: React.ReactChild;
}

export const ResponsiveDialog = (props: ResponsiveDialogProps) => {
  const { title, onClose, children, fullScreen, ...rest } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog fullScreen={isMobile || fullScreen} {...rest}>
      <AppBar color="default" sx={{ position: 'relative' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography noWrap variant="h6">
            {title}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
            aria-label="close"
            edge="end"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
