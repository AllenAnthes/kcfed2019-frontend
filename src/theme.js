import { blueGrey, common, deepPurple, grey, pink } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { merge } from 'lodash';

const base = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
    body1: {
      fontSize: 12,
    },
    caption: {
      color: blueGrey['300'],
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle1: {
      color: blueGrey['600'],
    },
    subtitle2: {
      color: blueGrey['600'],
    },
    display2: {
      fontSize: 26,
    },
    overline: {
      color: blueGrey['300'],
    },
  },
  palette: {
    type: 'light',
    primary: {
      dark: deepPurple['500'],
      light: deepPurple['100'],
      main: deepPurple['300'],
    },
    secondary: {
      dark: grey['500'],
      light: grey['100'],
      main: '#fadf35',
    },
    error: pink,
  },
  props: {
    MuiLink: {
      color: 'inherit',
    },
    MuiTabs: {
      indicatorColor: 'primary',
    },
    MuiTextField: {
      variant: 'outlined',
    },
  },
  overrides: {
    MuiGrid: {
      'spacing-xs-2': {
        width: '100%',
        margin: 0,
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          backgroundColor: '#4e8edd',
        },
      },
    },
    MuiFormControl: {
      root: {
        margin: '8px 0',
      },
    },
    MuiLinearProgress: {
      root: {
        height: '8px',
        borderRadius: '8px',
      },
      bar: {
        borderRadius: '8px',
      },
      colorPrimary: {
        backgroundColor: 'transparent',
      },
    },
    MuiIconButton: {
      root: {
        padding: '6px',
      },
    },
    MuiList: {
      root: {
        width: '100%',
      },
    },
    MuiSelect: {
      select: {
        '&:focus': {
          background: 'transparent',
        },
      },
    },
    MuiTableCell: {
      paddingNone: {
        padding: 4,
      },
    },
  },
};

export const light = createMuiTheme(
  merge(base, {
    typography: {
      caption: {
        color: blueGrey['300'],
      },
      subtitle1: {
        color: blueGrey['600'],
      },
      subtitle2: {
        color: blueGrey['600'],
      },
      overline: {
        color: blueGrey['300'],
      },
    },
    palette: {
      text: {
        primary: blueGrey['900'],
        secondary: blueGrey['600'],
      },
      background: {
        paper: common['white'],
        default: blueGrey['50'],
      },
      chip: {
        focused: grey['300'],
      },
      divider: blueGrey['100'],
    },
  })
);

export const dark = createMuiTheme(
  merge(base, {
    typography: {
      caption: {
        color: blueGrey['300'],
      },
      subtitle1: {
        color: blueGrey['600'],
      },
      subtitle2: {
        color: blueGrey['600'],
      },
      overline: {
        color: blueGrey['300'],
      },
    },
    palette: {
      type: 'dark',
      text: {
        primary: blueGrey['50'],
        secondary: blueGrey['100'],
      },
      background: {
        paper: blueGrey['800'],
        default: blueGrey['900'],
      },
      chip: {
        focused: grey['700'],
      },
      divider: blueGrey['700'],
    },
  })
);
