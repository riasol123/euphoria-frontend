import backgroundImage from '../../assets/body_background.png';

export const navbarStyles = {
  box: {
    flexGrow: 1,
    paddingTop: 0,
    position: 'fixed',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '260px 240px',
    zIndex: 10,
  },
  appBar: {
    border: 'none',
    background: 'none',
    height: '64px',
    width: '1140px',
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
