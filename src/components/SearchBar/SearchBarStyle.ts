const textStyle = {
  fontFamily: '"Montserrat Alternates", sans-serif',
  fontStyle: 'normal',
  color: '#393939',
};

export const searchStyles = {
  mainContainer: {
    display: 'flex',
    height: '70px',
    gap: '30px',
    padding: '10px',
    boxSizing: 'border-box',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '20px',
    alignItems: 'center',
    '& img': {
      margin: '0px 10px',
    },
    '& .MuiInputAdornment-root': {
      margin: '0px',
      width: 'fit-content',
    },
    '& .searchButton': {
      borderRadius: '20px',
      height: '50px',
      backgroundColor: '#FF5333',
      ...textStyle,
      color: '#fff',
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '16px',
      width: '126px',
      padding: '0px 20px',
    },
    '& .searchButton:hover': {
      backgroundColor: '#FFBEB2',
      color: '#393939',
    },
    '& .ant-picker-input': {
      width: 'fit-content',
    },
    '& div.ant-picker': {
      boxShadow: 'none',
    },
    '& #people-count': {
      ...textStyle,
      fontSize: '14px',
      textTransform: 'none',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      outline: 'none',
      padding: '0px',
      fontWeight: '400',
    },
    '& #people-count span:first-child': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '& .barItem': {
      flexGrow: 1,
      justifyContent: 'center',
    },
  },
  datePickerTheme: {
    token: {
      colorPrimary: '#FF5333',
      ...textStyle,
    },
  },
  input: {
    height: '50px',
    borderRadius: '20px',
    border: 'none',
    padding: '5px 0px',
    backgroundColor: 'none',
    '& fieldset': {
      border: 'none',
    },
    fontSize: '14px',
    ...textStyle,
  },
  peopleWrapper: {
    display: 'flex',
  },
  menu: {
    '& li div p, li div span': {
      ...textStyle,
      fontSize: '14px',
    },
    '.MuiPaper-root': {
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '8px 0',
      marginTop: '24px',
    },
  },
};
