export const categoryListStyles = {
  container: {
    position: 'relative',
    width: '100%',
    // overflow: 'hidden',
    padding: '40px 0px',
    display: 'flex',
    alignItems: 'center',
    '&:hover .arrow-button': {
      opacity: 1,
    },
  },
  sliderContainer: {
    display: 'flex',
    gap: '20px',
    transition: 'transform 0.5s ease-in-out',
    width: 'fit-content',
  },
  arrowLeft: {
    position: 'absolute',
    right: -60,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  arrowRight: {
    position: 'absolute',
    left: -60,
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 1,
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  visibleContainer: {
    width: '1140px', // 4 cards * 270px + 3 gaps * 20px
    display: 'flex',
    overflow: 'hidden',
  }
};
