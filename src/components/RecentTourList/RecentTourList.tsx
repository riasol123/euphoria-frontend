import { useEffect, useState } from 'react';
import ImageList from '@mui/material/ImageList';
import { RecentTourListItem } from '../RecentTourListItem/RecentTourListItem';
import { recentTourListStyles } from './RecentTourListStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getToursRequest } from '../../redux/actions/tour';
import { getImageUrl } from '../../utils/getImageUrl';

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
    dispatch(getToursRequest());
  }, [dispatch]);

  // Фильтрация и сортировка туров по дате startDate первого потока
  const sortedTours = (tours || [])
    .map((tour: Tour) => ({
      ...tour,
      flows: [{
        startDate: new Date(Date.now() + Math.random() * 1000000000).toISOString(), // случайная дата в будущем
      }]
    }))
    .sort((a: Tour, b: Tour) =>
      new Date(a.flows[0].startDate).getTime() - new Date(b.flows[0].startDate).getTime()
    )
    .slice(0, 3);


  const handleImageLoad = (tourId: string) => {
    setLoadedImages((prev) => ({
      ...prev,
      [tourId]: true,
    }));
  };

  // Проверяем, что все картинки загрузились
  const allImagesLoaded =
    sortedTours.length > 0 &&
    sortedTours.every((tour: Tour) => loadedImages[tour.id.toString()]);

  const skeletons = [0, 1, 2];

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

  return (
    <ImageList cols={3} gap={20} sx={recentTourListStyles.imageList}>
      {sortedTours.map((tour: Tour, index: number) => {
        const flow = tour.flows[0];
        const date = new Date(flow.startDate);
        const day = date.getDate();
        const month = date.toLocaleString('ru-RU', { month: 'long' });
        const imgUrl = tour.photos?.[0]
          ? getImageUrl(tour.photos[0])
          : '';
        return (
          <RecentTourListItem
            id={Number(tour.id)}
            key={tour.id}
            img={imgUrl}
            title={tour.title}
            day={day}
            month={month}
            featured={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onImageLoad={() => handleImageLoad(tour.id.toString())}
            showSkeleton={!loadedImages[tour.id]}          />
        );
      })}
    </ImageList>
  );
};
