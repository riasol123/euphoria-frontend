import * as mui from '@mui/material';

const theme = mui.createTheme({
  palette: {
    primary: {
      main: '#FF5722',
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#FF5722',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#FF5722',
          },
        },
        track: {
          '.Mui-checked + &': {
            backgroundColor: '#FF5722',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFA999',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#FF5722',
          },
        },
      },
    },
  },
});

export default theme;
