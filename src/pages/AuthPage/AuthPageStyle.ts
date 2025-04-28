const textStyle = {
  fontFamily: '"Montserrat Alternates", sans-serif',
  fontStyle: 'normal',
  color: '#393939',
};

export const authPageStyles = {
  container: {
    width: '100%',
    height: 'calc(100vh - 64px - 30px)',
    display: 'flex',
    borderRadius: '20px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    padding: '30px 0px',
    '& > img': {
      width: '50%',
      borderRadius: '0px 20px 20px 0px',
    },
  },
  authForm: {
    backgroundColor: '#ffffff',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    borderRadius: '20px 0px 0px 20px',
    padding: '60px 82px',
    boxSizing: 'border-box',
    '& > p': {
      ...textStyle,
    },
  },
  input: {
    width: '100%',
    '& .MuiInputBase-root': {
      borderRadius: '20px',
    },
    '& fieldset': {
      border: '1px solid #FF5333',
      borderRadius: '20px',
    },
    '& input': {
      ...textStyle,
    },
    '& label':{
      paddingRight: '5px',
      backgroundColor: '#fff',
      ...textStyle,
      color: '#9C9C9C',
    },
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#FF5333',
    fontWeight: 'bold',
    borderRadius: '20px',
    height: '56px',
    ...textStyle,
    color: '#fff',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#FFBEB2',
    },
  },
  loginDescription: {
    fontSize: '16px',
    margin: '0px 0px 15px 0px',
  },
  loginTitle: {
    fontSize: '32px',
  },
  forgottenPassword: {
    fontSize: '14px',
    width: '100%',
    textAlign: 'right',
  },
  optionAction: {
    display: 'flex',
    gap: '5px',
    '& p + p': {
      fontSize: '14px',
      ...textStyle,
    },
    '& p': {
      fontSize: '14px',
      ...textStyle,
      color: '#9C9C9C',
    },
  },
};
