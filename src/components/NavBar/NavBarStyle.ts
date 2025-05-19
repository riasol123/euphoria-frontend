import backgroundImage from '../../assets/body_background.png';

export const navbarStyles = {
  box: {
    flexGrow: 1,
    left: 0,
    paddingTop: 0,
    position: 'fixed',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: '260px 240px',
    zIndex: 10,
    width: '100%',
  },
  appBar: {
    border: 'none',
    background: 'none',
    height: '64px',
    width: '1140px',
    margin: 'auto',
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
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: '18px',
    textTransform: 'none',
    width: '126px',
    ':hover': {
      fontWeight: '700',
      background: 'none',
    },
  },
  userIcon: {
    marginLeft: '20px',
  },
};
