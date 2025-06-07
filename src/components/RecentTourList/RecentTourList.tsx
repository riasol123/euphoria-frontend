import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import { RecentTourListItem } from '../RecentTourListItem/RecentTourListItem';
import { recentTourListStyles } from './RecentTourListStyle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchToursRequest } from '../../redux/actions/tour';

interface Tour {
  id: number;
  title: string;
  photos?: string[];
  flows: Array<{
    startDate: string;
  }>;
}

export const RecentTourList = () => {
  const dispatch = useDispatch();
  const { tours, loading } = useSelector((state: any) => state.tour);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    dispatch(fetchToursRequest());
  }, [dispatch]);

  // Оставляем только 3 ближайших тура по дате flows[0].startDate
  const sortedTours = (tours || [])
    .filter((tour: Tour) => Array.isArray(tour.flows) && tour.flows.length > 0)
    .sort((a: Tour, b: Tour) => new Date(a.flows[0].startDate).getTime() - new Date(b.flows[0].startDate).getTime())
    .slice(0, 3);

  const handleImageLoad = (tourId: string) => {
    setLoadedImages(prev => ({
      ...prev,
      [tourId]: true
    }));
  };

  const allImagesLoaded = sortedTours.length > 0 && 
    sortedTours.every((tour: Tour) => loadedImages[tour.id]);

  const skeletons = [0, 1, 2];

  // Если идет загрузка или нет туров, показываем только скелетоны
  if (loading || sortedTours.length === 0) {
    return (
      <ImageList cols={3} gap={20} sx={recentTourListStyles.imageList}>
        {skeletons.map((_, index) => (
          <RecentTourListItem
            key={index}
            id={index}
            img=""
            title=""
            day={0}
            month=""
            featured={index === 0}
            onMouseEnter={() => {}}
            onImageLoad={() => {}}
            showSkeleton={true}
          />
        ))}
      </ImageList>
    );
  }

  // Если есть туры, показываем их
  return (
    <ImageList cols={3} gap={20} sx={recentTourListStyles.imageList}>
      {sortedTours.map((tour: Tour, index: number) => {
        const flow = tour.flows[0];
        const date = new Date(flow.startDate);
        const day = date.getDate();
        const month = date.toLocaleString('ru-RU', { month: 'long' });
        return (
          <RecentTourListItem
            id={Number(tour.id)}
            key={tour.id}
            img={tour.photos?.[0] ? (process.env.VITE_API_BASE_URL + '/' + tour.photos[0]) : ''}
            title={tour.title}
            day={day}
            month={month}
            featured={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onImageLoad={() => handleImageLoad(tour.id.toString())}
            showSkeleton={!allImagesLoaded}
          />
        );
      })}
    </ImageList>
  );
};
