import { Box } from '@mui/system';

import { TourCard } from '../TourCard/TourCard';

import { styles } from './TourCardListStyle';
import { useSelector } from 'react-redux';
import { RootState } from '../../hooks/getTypedSelector';

export const TourCardList = () => {
  const { tours } = useSelector((state: RootState) => state.tour);
  return (
    <Box sx={styles.container}>
      {tours.map((tour, id) => <TourCard
        key={id}
        title={tour.title}
        description={tour.description}
        location={tour.city}
        duration={tour.duration}
        price={tour.flows[0].currentPrice}
        img={tour.photos[0]}
        rate={'5.0'}
      ></TourCard>)}
    </Box>
  );
}
