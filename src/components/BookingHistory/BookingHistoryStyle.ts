export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '0px 0px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '500',
    margin: '10px auto',
    color: '#393939',
  },
  table: {
    '& .MuiTableCell-root': {
      fontSize: '14px',
      color: '#393939',
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: '16px 10px',
      maxWidth: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& .MuiTableCell-head': {
      fontWeight: 500,
    },
    '& .tour-name-column': {
      width: '200px',
      whiteSpace: 'normal',
      overflow: 'visible',
      textOverflow: 'clip',
    },
    '& .dates-column': {
      width: '200px',
    },
  },
  statusChip: {
    borderRadius: '16px',
    padding: '6px 12px',
    fontWeight: 500,
    width: 'fit-content',
    margin: '0 auto',
  },
  confirmed: {
    backgroundColor: '#E3F5FF',
    color: '#0184E6',
  },
  cancelled: {
    backgroundColor: '#FFE9E9',
    color: '#E60101',
  },
  completed: {
    backgroundColor: '#E9FFE9',
    color: '#01E601',
  },
  upcoming: {
    backgroundColor: '#FFF3E3',
    color: '#E67F01',
  },
}; 