export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'left',
    flexWrap: 'wrap',
    padding: '0px 60px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    margin: '10px auto',
    color: '#393939',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#393939',
    marginTop: '10px',
  },
  listItem: {
    fontSize: '16px',
    color: '#666',
    marginLeft: '20px',
  },
  warning: {
    fontSize: '14px',
    color: '#FF5722',
    marginTop: '20px',
    fontWeight: '500',
    whiteSpace: 'normal',
    overflow: 'visible',
    textOverflow: 'clip',
  },
  input: {
    backgroundColor: '#ffffff',
    '& fieldset': {
      borderRadius: '20px',
    },
    margin: '10px 0px'
  },
  submitButton: {
    borderRadius: '20px',
    fontSize: '18px',
    textTransform: 'none',
    fontWeight: '600',
    height: '56px',
    marginTop: '20px',
    '&:hover': {
      backgroundColor: '#FFBEB2',
    },
  },
  status: {
    fontSize: '20px',
    color: '#393939',
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
  },
}; 