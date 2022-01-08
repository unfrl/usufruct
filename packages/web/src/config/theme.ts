import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import secondaryColor from '@mui/material/colors/deepPurple';
import primaryColor from '@mui/material/colors/teal';
import { Theme } from '@mui/material/styles';

const SYSTEM_FONT = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

export const getThemeOptions = (mode: 'dark' | 'light') => ({
  palette: {
    mode,
    primary: primaryColor,
    secondary: secondaryColor,
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: SYSTEM_FONT,
    fontFamilyCode: [
      'Consolas',
      'Menlo',
      'Monaco',
      'Andale Mono',
      'Ubuntu Mono',
      'monospace',
    ].join(','),
    fontFamilyTagline: SYSTEM_FONT,
    fontFamilySystem: SYSTEM_FONT,
  },
});

export function getThemedComponents(theme: Theme) {
  return {
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded,
        },
        styleOverrides: {
          iconFilled: {
            top: 'calc(50% - .25em)',
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1, 2),
            borderColor: theme.palette.divider,
          },
          head: {
            color: theme.palette.text.primary,
            fontWeight: 700,
          },
          body: {
            color: theme.palette.text.secondary,
          },
        },
      },
    },
  };
}
