import { FC } from 'react';
import ReactDOMServer from 'react-dom/server';

import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { Box, Typography } from '@mui/material';
import { BookBar } from '../../components/BookBar/BookBar';
import { styles } from './TourPageStyle';
import StarIcon from '../../assets/star.svg';
import { useParams } from 'react-router-dom';

const TourPage: FC = () => {
  const { id } = useParams(); // получаем id из URL

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
   <div>
   <p style={{ fontSize: '25px', fontWeight: '500' }}>О туре</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Добро пожаловать в одну из самых колоритных и гостеприимных республик, сердце Северного Кавказа, Северную Осетию - Аланию! В этом насыщенном туре вы увидите лучшие уголки природы - Кармадонское ущелье, сказочный Цей, ледники, каньоны и горные реки. Также увидите башни и некрополь Даргавс, узнаете историю этих мест, посетите Национальный парк Алания и насладитесь вкуснейшей кавказской кухней. И на протяжении всего путешествия по Осетии мы будем вас знакомить с местными традициями, культурой и обычаями. Путешествуем на комфортных внедорожниках, благодаря чему посетим самые красивые и захватывающие дух локации, а они как правило в таких местах, куда только на джипе. Ждём вас в гости, друзья! Обычно наши путешественники влюбляются в Осетию с первого взгляда. Мы уверены, у вас будет также. В целом это спокойный, ознакомительный тур. Из физических нагрузок - 40 минут подъема до Мидаграбинских водопадов</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{ fontSize: '25px', fontWeight: '500' }}>Проживание</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '19px'}}>Атмосфера; Порог неба, Бутик-отели, Шале</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    · 1-местный номер</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    · 2-местный номер</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    · 3-местный номер</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{ fontSize: '25px', fontWeight: '500' }}>Включено в стоимость</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '19px'}}>Включено</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Проживание две ночи в отеле Атмосфера во Владикавказе</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Проживание две ночи в горах на турбазе Порог неба</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Трансфер из/в аэропорт</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '19px'}}>Завтраки</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Обеды либо пикники в горах</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Наше полное сопровождение</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Не включено</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Авиаперелет</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Траты на сувениры</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Входные билеты (1300р за все дни) - горячие источники 500р, канатная дорога будние дни - 700р, выходные дни - 800р; некрополь 150р.</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '19px'}}>Завтраки</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Ужины, не заявленные в программе</p>
<p style={{fontSize: '14px', width: '830px'}}>    </p>
<p style={{fontSize: '14px', width: '830px'}}>    Дополнительные развлечения: полет на параплане 6т.р. / чел.</p>


   </div>
  </Box>
  );
};

console.log(ReactDOMServer.renderToString());


export default TourPage;
