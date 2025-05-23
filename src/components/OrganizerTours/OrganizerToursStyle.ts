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
    margin: '10px 0px',
    color: '#393939',
    textAlign: 'center'
  },
  tableContainer: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
    '& .MuiTableCell-root': {
      fontSize: '14px',
      color: '#393939',
      textAlign: 'left',
      verticalAlign: 'baseline',
      padding: '16px',
      maxWidth: '200px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& .MuiTableCell-head': {
      fontWeight: 500,
      paddingTop: '0px',
    },
    '& .tour-name-column': {
      width: '200px',
      whiteSpace: 'normal',
      overflow: 'visible',
      textOverflow: 'clip',
    },
    '& .status-cell': {
      width: '120px',
      minWidth: '120px',
    },
  },
  statusSelect: (status: 'active' | 'paused') => ({
    width: '127px',
    '& .MuiSelect-select': {
      color: status === 'active' ? '#4CAF50' : '#FFA726',
      fontWeight: 500,
      fontSize: '14px',
      padding: '0px',
      display: 'flex',
      alignItems: 'baseline',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  }),
  menuItem: {
    fontSize: '14px',
  },
  datesCell: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    '& .MuiTypography-root': {
      fontSize: '14px',
    },
  },
  datesHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  datesCount: {
    color: '#666',
    fontWeight: 500,
  },
  datesList: {
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  dateItem: {
    color: '#666',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
  },
}; 