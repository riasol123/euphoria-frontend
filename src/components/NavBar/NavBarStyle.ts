import backgroundImage from '../../assets/body_background.png';

export const navbarStyles = {
  box: {
    flexGrow: 1,
    paddingTop: 0,
    position: 'sticky',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '260px 240px',
    top: '0',
    left: '0',
    zIndex: '1',
  },
  appBar: {
    border: 'none',
    background: 'none',
    height: '64px',
    width: '100%',
    '& div': {
      padding: '0px',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  button: {
    color: '#393939',
    backgroundColor: 'none',
    marginLeft: '15px',
    borderRadius: '16px',
    fontFamily: '"Montserrat Alternates", sans-serif',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: '20px',
    textTransform: 'none',
    width: '126px',
    ':hover': {
      border: '1px solid #C5C5C5',
      background: 'none',
    },
  },
};
