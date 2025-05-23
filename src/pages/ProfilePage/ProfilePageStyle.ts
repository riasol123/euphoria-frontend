export const styles = {
  tab: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '290px',
    padding: '20px',
    minWidth: '290px',
    '& .MuiTabs-indicator': {
      left: '0',
    },
    '& button': {
      textTransform: 'none',
      fontSize: '16px',
      alignContent: 'flex-start',
      flexWrap: 'wrap',
      padding: '20px 16px',
    },
  },
  panel: {
    flexGrow: 1,
    backgroundColor: '#fff',
    borderRadius: '20px',
    '& div[role="tabpanel"]': {
      height: '100%',
    },
  },
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px 0px',
    height: 'calc(100vh - 64px)',
  },
  tabPanelBox: {
    p: 3,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
};
