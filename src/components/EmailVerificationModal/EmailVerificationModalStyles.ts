const textStyle = {
  fontFamily: '"Montserrat Alternates", sans-serif',
  fontStyle: 'normal',
  color: '#393939',
};

export const emailVerificationModalStyles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '20px',
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '25px',
  },
  title: {
    ...textStyle,
    fontSize: '24px',
    fontWeight: 'bold',
  },
  text: {
    ...textStyle,
    fontSize: '16px',
  },
  errorText: {
    ...textStyle,
    color: '#FF5333',
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
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#FFBEB2',
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
    '& label': {
      paddingRight: '5px',
      backgroundColor: '#fff',
      ...textStyle,
      color: '#9C9C9C',
    },
    fontSize: '14px',
  },
  resendButton: {
    color: '#FF5333',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#FFBEB2',
    },
  },
}; 