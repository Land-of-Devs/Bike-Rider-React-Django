import { green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#ffffff'
    },
    white: {
      main: '#ffffff'
    },
    secondary: {
      main: green[800],
      contrastText: '#ffffff'
    },
  },
});
