export const styles = {
  ratingIcon: {
    marginRight: '2px',
  },
  topTextContainer: {
    display: 'flex',
    justifyContent: 'left',
    alignContent: 'center',
    '& p': {
      fontSize: '13px',
    },
    '& p + p': {
      marginLeft: '15px',
      color: '#8a8a8a',
      flexGrow: '1',
      textAlign: 'right',
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 1,
      WebkitBoxOrient: 'vertical',
      textOverflow: 'ellipsis',
    },
  },
  cardContainer: {
    width: '270px',
    borderRadius: '20px',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '15px',
    margin: '5px 0px'
  },
  description: {
    fontSize: '13px',
    color: '#8a8a8a',
    flexGrow: 1,
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
  },
  bottomTextContainer: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    marginTop: '10px',
    gap: '5px',
    '& p': {
      fontSize: '17px',
    },
    '& p + p': {
      color: '#8a8a8a',
      fontSize: '14px',
    },
  },
};
