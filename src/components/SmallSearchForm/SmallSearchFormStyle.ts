const textStyle = {
  fontFamily: '"Montserrat Alternates", sans-serif',
  fontStyle: 'normal',
  color: '#393939',
};

export const searchStyles = {
  formControl: {
    width: '100%',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '407px',
    justifyContent: 'space-between',
    '& img': {
      marginRight: '5px',
      marginLeft: '10px',
    },
    '& .MuiInputAdornment-root': {
      margin: '0px',
      width: 'fit-content',
    },
    '& button': {
      width: '100%',
      borderRadius: '20px',
      height: '50px',
      backgroundColor: '#FF5333',
      ...textStyle,
      color: '#fff',
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '16px',
    },
    '& button:hover': {
      backgroundColor: '#FFBEB2',
      color: '#393939',
    },
    '& .ant-picker-input': {
      width: '100px',
    },
    '& div.ant-picker': {
      boxShadow: 'none',
    },
  },
  datePickerTheme: {
    token: {
      colorPrimary: '#FF5333',
      backgroundColor: '#F0ECEB',
      ...textStyle,
    },
  },
  input: {
    height: '50px',
    width: '100%',
    borderRadius: '20px',
    border: 'none',
    padding: '5px 0px',
    backgroundColor: '#F0ECEB',
    '& fieldset': {
      border: 'none',
    },
    fontSize: '14px',
    ...textStyle,
  },
  inputContainer: {
    backgroundColor: '#fff',
    height: 'fit-content',
    width: '321px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    gap: '20px',
    borderRadius: '20px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    '& p, h6, input': {
      lineHeight: '1.3',
      ...textStyle,
    },
    '& p': {
      fontWeight: 200,
      fontSize: '18px',
    },
    '& h6': {
      fontWeight: 400,
      fontSize: '30px',
    },
  },
};
