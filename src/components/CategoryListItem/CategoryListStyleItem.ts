export const itemStyles = {
  card: {
    width: '272px',
    height: '180px',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px 30px',
    borderRadius: '20px',
    '& span, p': {
      fontFamily: '"Montserrat Alternates", sans-serif',
      fontWeight: 200,
      fontStyle: 'normal',
      fontSize: '16px',
      color: '#393939',
    },
    '& span': {
      fontWeight: '400',
    },
    '& p': {
      fontSize: '14px',
    },
    '& img': {
      width: '30px',
      height: '30px',
      padding: '0px',
    },
    '& div, .MuiCardContent-root': {
      padding: '0px',
    }
  },
  header: {
    width: '100%',
    justify: 'left',
    '& div': {
      width: 'fit-content',
      margin: '0px',
    }
  },
};
