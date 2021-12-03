import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const DEFAULT_WIDTH = 450;

export interface ResponsiveDrawerProps {
  title: string;
  anchor: 'left' | 'right';
  children: JSX.Element;
  open: boolean;
  onClose: () => void;
  width?: number;
  /**
   * By default a close button will be rendered alongside the header title.
   * Provide `headerOptions` to override the close button with your own controls.
   */
  headerOptions?: JSX.Element;
}

export const ResponsiveDrawer = (props: ResponsiveDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const width = isMobile ? '100vw' : props.width ?? DEFAULT_WIDTH;
  const { title, anchor, children, open, onClose, headerOptions } = props;

  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={onClose}
      PaperProps={{ style: { width } }}
    >
      <AppBar position="sticky" color="default">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          {headerOptions ?? (
            <IconButton
              color="inherit"
              onClick={onClose}
              aria-label="close"
              size="small"
            >
              <CloseIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </Drawer>
  );
};
