export const itemStyles = {
  card: {
    width: '270px',
    height: '190px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
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
    display: 'flex',
    gap: '10px',
    '& div': {
      width: 'fit-content',
      margin: '0px',
    }
  },
};
