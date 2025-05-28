import { Box } from '@mui/system';
import { TourCard } from '../TourCard/TourCard';
import { styles } from './TourCardListStyle';
import { useSelector } from 'react-redux';

export const TourCardList = () => {
  const { tours } = useSelector((state: any) => state.tour);

  if (!tours || tours.length === 0) {
    return null;
  }

  return (
    <Box sx={styles.container}>
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
        title={tour.title}
        description={tour.description}
        location={tour.city}
        duration={tour.duration}
          price={tour.flows?.[0]?.currentPrice || ''}
          img={tour.photos?.[0] ? (process.env.VITE_API_BASE_URL + '/' + tour.photos[0]) : ''}
          rate={tour.rate || '—'}
        />
      ))}
    </Box>
  );
};
