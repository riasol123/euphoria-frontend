export const itemStyles = {
  container: {
    width: '270px',
    height: '464px',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    flex: 'none',
    position: 'sticky',
    gap: '10px',
    '& #people-count': {
      fontSize: '16px',
      textTransform: 'none',
      backgroundColor: 'transparent',
      boxShadow: 'none',
      outline: 'none',
      padding: '5px',
      fontWeight: '400',
      color: '#393939',
      border: '1px solid #c9c9c9',
      width: '100%',
      borderRadius: '10px',
    },
    '& hr': {
      margin: '5px 0px',
    },
    '& .searchButton': {
      borderRadius: '15px',
      height: '50px',
      backgroundColor: '#FF5333',
      color: '#fff',
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '16px',
      padding: '0px 20px',
    },
    '& .searchButton:hover': {
      backgroundColor: '#FFBEB2',
      color: '#393939',
    },
  },
  price: {
    display: 'flex',
    alignItems: 'flex-end',
    flexGrow: '1',
    gap: '5px',
    '& p': {
      fontSize: '18px',
      fontWeight: '500',
      marginRight: '15px',
    },
    '& p + p': {
      fontSize: '17px',
      marginRight: '0px',
    },
    '& p + p + p': {
      color: '#8a8a8a',
      fontSize: '14px',
      marginRight: '0px',
    },
  },
  title: {
    fontWeight: '500',
    fontSize: '20px',
    textAlign: 'center',
  },
  popper: {
    fontFamily: '"Montserrat Alternates", sans-serif',
    fontStyle: 'normal',
    color: '#393939',
    fontSize: '14px',
  },
  textField: {
    '& fieldset': {
      fontSize: '14px',
      borderRadius: '15px',
    },
  },
  availability: {
    display: 'flex',
    '& p + p': {
      flexGrow: '1',
      textAlign: 'center',
    }
  },
  select: {
    '& fieldset': {
      borderRadius: '15px',
    },
  },
};
