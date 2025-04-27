import { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import { RecentTourListItem } from '../RecentTourListItem/RecentTourListItem';
import { recentTourListStyles } from './RecentTourListStyle';
import first from '../../assets/first_temp.jpg';
import second from '../../assets/second_temp.jpg';
import third from '../../assets/third_temp.jpg';

export const RecentTourList = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ImageList cols={3} gap={20} sx={recentTourListStyles.imageList}>
      {itemData.map((item, index) => (
        <RecentTourListItem
          key={index}
          img={item.img}
          title={item.title}
          day={item.day}
          month={item.month}
          featured={activeIndex === index}
          onMouseEnter={() => setActiveIndex(index)}
        />
      ))}
    </ImageList>
  );
};

const itemData = [
  {
    img: first,
    day: 29,
    month: 'мая',
    title: 'Гастро-ужин Вкус Италии',
  },
  {
    img: second,
    day: 11,
    month: 'мая',
    title: 'Дегустация вина',
  },
  {
    img: third,
    day: 15,
    month: 'мая',
    title: 'Медовые угодья Первомайские',
  },
];
