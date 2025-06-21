import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../hooks/getTypedSelector';

import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { Box, Divider, Typography } from '@mui/material';
import { BookBar } from '../../components/BookBar/BookBar';
import { styles } from './TourPageStyle';
import { getTourRequest } from '../../redux/actions/tour';
import { useParams } from 'react-router-dom';

const TourPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const currentTour = useSelector((state: RootState) => state.tour.currentTour);

  useEffect(() => {
    if (id) {
      dispatch(getTourRequest(Number(id)));
    }
  }, []);

  function formatText(input: string) {
    return input
      .split('\n')
      .map((line, idx) => {
        const trimmed = line.trim();
        if (/^\*{3}.*\*{3}$/.test(trimmed)) {
          const content = trimmed.replace(/^\*{3}|\*{3}$/g, '').trim();
          return <p key={idx} style={{ fontSize: '25px', fontWeight: '500' }}>{content}</p>;
        }
        if (/^\*{2}.*\*{2}$/.test(trimmed)) {
          const content = trimmed.replace(/^\*{2}|\*{2}$/g, '').trim();
          return <p key={idx} style={{ fontSize: '19px' }}>{content}</p>;
        }
        if (/^·/.test(trimmed)) {
          return <p key={idx} style={{ fontSize: '14px', width: '830px', marginLeft: 16 }}>{line}</p>;
        }
        return <p key={idx} style={{ fontSize: '14px', width: '830px' }}>{line}</p>;
      });
  }

  return (
    <Box sx={styles.main}>
      <Box sx={styles.container}>
        <ImageGallery tour={currentTour} />
        <BookBar tour={currentTour} />
      </Box>
      <Box sx={styles.titleContainer}>
        <Typography sx={styles.title}>{currentTour?.title || 'Тур'}</Typography>
      </Box>
      <Divider />
      <div>
        {currentTour?.description ? formatText(currentTour.description) : null}
      </div>
    </Box>
  );
};

export default TourPage;
