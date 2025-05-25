const CARD_HEIGHT = '407px';
const CARD_WIDTH = '100%';
const CARD_WIDTH_SMALL = '126px';

export const itemStyles = {
  imageListItemBar: {
    background: 'linear-gradient(0deg,rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0) 50%)',
    height: '100%',
    alignItems: 'flex-end',
    '& div > div': {
      gap: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    '& p': {
      fontFamily: '"Montserrat Alternates", sans-serif',
      fontWeight: 200,
      fontStyle: 'normal',
      fontSize: '24px',
      color: '#fff',
    },
  },
  title: {
    flexGrow: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  verticalDate: {
    position: 'absolute',
    bottom: '70px',
    left: '50%',
    transform: 'translateX(-50%) rotate(-90deg)',
    transformOrigin: 'center',
    whiteSpace: 'nowrap',
    '& p': {
      fontSize: '20px',
      fontWeight: 300,
      color: '#fff',
      lineHeight: 1.2,
    },
  },
  featured: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '25px',
    transition: 'all 1s ease',
    margin: 0,
    padding: 0,
    '& img': {
      objectFit: 'cover',
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0,
    },
  },
  default: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH_SMALL,
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '25px',
    transition: 'all 1s ease',
    margin: 0,
    padding: 0,
    '& img': {
      objectFit: 'cover',
      height: '100%',
      width: '100%',
      margin: 0,
      padding: 0,
    },
  },
};
