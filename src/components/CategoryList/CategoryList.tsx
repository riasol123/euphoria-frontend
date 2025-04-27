import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { categoryListStyles } from './CategoryListStyle';
import { CategoryListItem } from '../CategoryListItem/CategoryListItem';

import wine from '../../assets/wine.png';
import cheese from '../../assets/cheese.png';
import chilli from '../../assets/chilli-pepper.png';
import shrimp from '../../assets/shrimp.png';
import croissant from '../../assets/croissant.png';
import party from '../../assets/party-ornament.png';
import cauliflower from '../../assets/cauliflower.png';
import vegan from '../../assets/vegan.png';
import steak from '../../assets/steak.png';
import arrowLeft from '../../assets/arrow_left.svg';
import arrowRight from '../../assets/arrow_right.svg';

const ITEMS_PER_PAGE = 4;

export const CategoryList = () => {
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const canGoBack = startIndex > 0;
  const canGoForward = endIndex < itemData.length;

  const handlePrev = () => {
    if (canGoBack) {
      setStartIndex(prev => Math.max(prev - 1, 0));
    }
  };
  
  const handleNext = () => {
    if (canGoForward) {
      setStartIndex(prev => prev + 1);
    }
  };  

  return (
    <Box
      sx={categoryListStyles.container}
    >
      {canGoBack && (
        <IconButton
          onClick={handlePrev}
          sx={categoryListStyles.arrowRight}
        >
          <img src={arrowLeft}/>
        </IconButton>
      )}

      <Box
        sx={{
          display: 'flex',
          gap: '20px',
        }}
      >
        {itemData.slice(startIndex, endIndex).map((item, index) => (
          <CategoryListItem
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </Box>

      {canGoForward && (
        <IconButton
          onClick={handleNext}
          sx={categoryListStyles.arrowLeft}
        >
          <img src={arrowRight}/>
        </IconButton>
      )}
    </Box>
  );
};

const itemData = [
  {
    icon: wine,
    title: 'Вино и терруар',
    description: 'Погружение в винодельни, дегустации, обучение винному этикету и параминг с блюдами.',
  },
  {
    icon: cheese,
    title: 'Сырный путь',
    description: 'Тур по лучшим сыродельням: от козьих сыров до выдержанных пармезанов.',
  },
  {
    icon: chilli,
    title: 'Острый маршрут',
    description: 'Для любителей остренького: кухни Мексики, Таиланда, Индии, Южной Кореи.',
  },
  {
    icon: shrimp,
    title: 'Морской гастротур',
    description: 'Всё, что связано с морепродуктами: устрицы, мидии, севиче, суши, рыбные рынки.',
  },
  {
    icon: croissant,
    title: 'Хлеб да выпечка',
    description: 'Круассаны, чиабатты, багеты, фокачча, лаваш. С посещением пекарен и мастер-классов по выпечке.',
  },
  {
    icon: party,
    title: 'Праздник вкуса',
    description: 'Тур под сезонные гастрособытия. Отличный способ совместить туризм с праздником.',
  },
  {
    icon: cauliflower,
    title: 'Эко-гастро',
    description: 'Фермерские продукты, органика, slow food, zero waste кулинария. Экскурсии на экофермы.',
  },
  {
    icon: vegan,
    title: 'Сладкая жизнь',
    description: 'Десерты и выпечка: от французских макаронс до восточной пахлавы. Кондитерские туры.',
  },
  {
    icon: steak,
    title: 'Эко-гастро',
    description: 'Всё о гриле и барбекю: аргентинский асадо, американский BBQ, грузинский шашлык.',
  },
];
