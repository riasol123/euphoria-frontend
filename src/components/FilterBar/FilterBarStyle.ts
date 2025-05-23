const removeArrows = {
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
};

export const itemStyles = {
  container: {
    width: '270px',
    height: 'calc(100vh - 205px)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    flex: 'none',
    alignSelf: 'stretch',
    position: 'fixed',
    zIndex: 1,
    gap: '10px',
    '& p, label, input, span.MuiTypography-root, div.MuiInputAdornment-root p': {
      fontFamily: '"Montserrat Alternates", sans-serif',
      fontStyle: 'normal',
      color: '#393939',
      fontSize: '14px',
    },
    '& div.MuiInputAdornment-root p, .MuiTextField-root label': {
      color: '#c9c9c9',
    },
    '& fieldset': {
      borderRadius: '15px',
    },
  },
  accommodation: {
    margin: '0px',
    justifyContent: 'left',
  },
  divider: {
    margin: '10px 0px'
  },
  popper: {
    fontFamily: '"Montserrat Alternates", sans-serif',
    fontStyle: 'normal',
    color: '#393939',
    fontSize: '14px',
    '& .MuiAutocomplete-popupIndicator': {
      background: 'none',
    },
    '& .MuiAutocomplete-popupIndicator:hover, .MuiAutocomplete-popupIndicator:hover *': {
      background: 'none',
    },
    '& .MuiTouchRipple-root *': {
      background: 'none',
    },
    '& .MuiAutocomplete-popupIndicator[aria-expanded="true"] .custom-dropdown-icon': {
      transform: 'rotate(180deg)',
    },
  },
  textField: {
    '& fieldset': {
      fontSize: '14px',
      borderRadius: '15px',
    },
  },
  durabilityTextFieldContainer: {
    display: 'flex',
  },
  textFieldFrom: {
    ...removeArrows,
    '& fieldset': {
      borderRadius: '15px 0px 0px 15px',
      borderRightWidth: '0px',
    },
    '&:hover fieldset': {
      borderRightWidth: '1px',
    },
  },
  textFieldTo: {
    ...removeArrows,
    '& fieldset': {
      borderRadius: '0px 15px 15px 0px',
    },
  },
};
