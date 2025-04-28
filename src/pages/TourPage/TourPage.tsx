import { FC } from 'react';

import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { Box, Divider, Typography } from '@mui/material';
import { BookBar } from '../../components/BookBar/BookBar';
import { styles } from './TourPageStyle';
import StarIcon from '../../assets/star.svg';


const TourPage: FC = () => {
  return (
  <Box sx={styles.main}>
    <Box sx={styles.container}>
      <ImageGallery></ImageGallery>
      <BookBar></BookBar>
    </Box>
    <Box sx={styles.titleContainer}>
      <Typography sx={styles.title}>Тур в сердце Осетии</Typography>
      <Box sx={styles.rating}>
        <img src={StarIcon}></img>
        <img src={StarIcon}></img>
        <img src={StarIcon}></img>
        <img src={StarIcon}></img>
        <img src={StarIcon}></img>
        <Typography>27 отзывов</Typography>
      </Box>
    </Box>
    <Divider></Divider>
    <Typography sx={styles.paragraphTitle}>О туре</Typography>
    <Typography sx={styles.paragraphDescription}>Добро пожаловать в одну из самых колоритных и гостеприимных республик, сердце Северного Кавказа, Северную Осетию - Аланию! В этом насыщенном туре вы увидите лучшие уголки природы - Кармадонское ущелье, сказочный Цей, ледники, каньоны и горные реки. Также увидите башни и некрополь Даргавс, узнаете историю этих мест, посетите Национальный парк Алания и насладитесь вкуснейшей кавказской кухней. И на протяжении всего путешествия по Осетии мы будем вас знакомить с местными традициями, культурой и обычаями.     Путешествуем на комфортных внедорожниках, благодаря чему посетим самые красивые и захватывающие дух локации, а они как правило в таких местах, куда только на джипе. Ждём вас в гости, друзья!     Обычно наши путешественники влюбляются в Осетию с первого взгляда. Мы уверены, у вас будет также.  В целом это спокойный, ознакомительный тур. Из физических нагрузок - 40 минут подъема до Мидаграбинских водопадов</Typography>
    <Divider></Divider>
    <Typography sx={styles.paragraphTitle}>Проживание</Typography>
    <Typography sx={styles.paragraphSubtitle}>Атмосфера; Порог неба, Бутик-отели, Шале</Typography>
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Typography sx={styles.paragraphDescription}>· 1-местный номер</Typography>
      <Typography sx={styles.paragraphDescription}>· 2-местный номер</Typography>
      <Typography sx={styles.paragraphDescription}>· 3-местный номер</Typography>
    </Box>
    <Divider></Divider>
    <Typography sx={styles.paragraphTitle}>Информация по прибытию</Typography>
    <Typography sx={styles.paragraphSubtitle}>Старт 1 мая, 15:00 (местное время) Владикавказ</Typography>
    <Typography sx={styles.paragraphSubtitle}>Финиш 4 мая, 17:30 (местное время) Владикавказ</Typography>
    <Divider></Divider>
    <Typography sx={styles.paragraphTitle}>Включено в стоимость</Typography>
    <Typography sx={styles.paragraphSubtitle}>Включено</Typography>
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Typography sx={styles.paragraphDescription}>Проживание две ночи в отеле Атмосфера во Владикавказе</Typography>
      <Typography sx={styles.paragraphDescription}>Проживание две ночи в горах на турбазе Порог неба</Typography>
      <Typography sx={styles.paragraphDescription}>Трансфер из/в аэропорт</Typography>
      <Typography sx={styles.paragraphDescription}>Завтраки</Typography>
      <Typography sx={styles.paragraphDescription}>Обеды либо пикники в горах</Typography>
      <Typography sx={styles.paragraphDescription}>Наше полное сопровождение</Typography>
    </Box>
    <Typography sx={styles.paragraphSubtitle}>Не включено</Typography>
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px' }}>
      <Typography sx={styles.paragraphDescription}>Авиаперелет</Typography>
      <Typography sx={styles.paragraphDescription}>Траты на сувениры</Typography>
      <Typography sx={styles.paragraphDescription}>Входные билеты (1300р за все дни) - горячие источники 500р, канатная дорога будние дни - 700р, выходные дни - 800р; некрополь 150р.</Typography>
      <Typography sx={styles.paragraphDescription}>Завтраки</Typography>
      <Typography sx={styles.paragraphDescription}>Ужины, не заявленные в программе</Typography>
      <Typography sx={styles.paragraphDescription}>Дополнительные развлечения: полет на параплане 6т.р. / чел.</Typography>
    </Box>
  </Box>
  );
};

export default TourPage;
