export const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBottom: '20px',
  },
  container: {
    display: 'flex',
    width: '100%',
    padding: '20px 0px',
    gap: '40px',
  },
  title: {
    fontSize: '35px',
    fontWeight: '500',
    color: '#393939',
  },
  rating: {
    display: 'flex',
    height: '20px',
    alignSelf: 'center',
    gap: '3px',
    marginRight: '10px',
    '& p': {
      marginLeft: '10px',
    },
    marginTop: '10px',
  },
  titleContainer: {
    // display: 'flex',
    alignItems: 'flex-end',
    paddingRight: '310px',
    paddingTop: '20px',
    paddingBottom: '20px',
  },
  paragraphTitle: {
    fontSize: '25px',
    fontWeight: '500',
  },
  paragraphSubtitle: {
    fontSize: '19px',
  },
  paragraphDescription: {
    fontSize: '14px',
    width: '830px',
  },
};
