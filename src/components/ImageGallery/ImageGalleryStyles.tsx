export const styles = {
  container: {
    display: 'grid',
    overflow: 'hidden',
    width: 'fit-content',
    height: '464px',
    gridTemplateColumns: 'repeat(3, 270px)',
    gridTemplateRows: 'repeat(2, 232px)',
    gap: '10px',
    borderRadius: '20px',
    '& div:has(.firstImg)': {
      gridColumn: '1 / 3',
      gridRow: '1 / 3',
    },
    '& div:has(.secondImg)': {
      gridColumn: '3',
      gridRow: '1',
    },
    '& div:has(.thirdImg)': {
      gridColumn: '3',
      gridRow: '2',
    },
    '& div img.firstImg': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    '& div img.secondImg': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    '& div img.thirdImg': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
};
