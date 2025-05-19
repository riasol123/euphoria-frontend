export const styles = {
  title: {
    fontSize: '24px',
    fontWeight: '500',
    margin: '10px auto',
    color: '#393939',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '0px 160px',
  },
  input: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width: '400px',
    gap: '20px',
    '& fieldset': {
      borderRadius: '20px',
    },
  },
  saveButton: {
    borderRadius: '20px',
    fontSize: '18px',
    textTransform: 'none',
    fontWeight: '600',
    height: '56px',
    width: '400px',
    '&:hover': {
      backgroundColor: '#FFBEB2',
    },
  },
};
