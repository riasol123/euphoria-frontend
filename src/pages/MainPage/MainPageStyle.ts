export const mainPageStyles = {
  searchContainer: {
    display: 'flex',
    gap: '40px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '30px',
    justifyContent: 'space-evenly',
    gap: '40px',
    height: 'fit-content',
    width: '100%',
  },
  categories: {
    width: '100%',
    '& > div': {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    '& hr': {
      flexGrow: 1,
      border: 'none',
      height: '1px',
      backgroundColor: '#393939',
    },
    '& p': {
      fontFamily: '"Montserrat Alternates", sans-serif',
      fontStyle: 'normal',
      color: '#393939',
      fontSize: '26px',
    }
  },
};
