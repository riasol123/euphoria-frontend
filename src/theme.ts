import * as mui from '@mui/material';

const theme = mui.createTheme({
  typography: {
    fontFamily: '"Montserrat Alternates", sans-serif',
  },
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
            border: '1px solid #FF5333'
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF5333',
            borderWidth: '1px',
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
