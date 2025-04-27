import { Box } from '@mui/system';

import TourImg from '../../assets/tour.jpg';
import { TourCard } from '../TourCard/TourCard';

import { styles } from './TourCardListStyle';

export const TourCardList = () => {
  return (
    <Box sx={styles.container}>
      {gastroTours.map((tour, id) => <TourCard
        key={id}
        title={tour.title}
        description={tour.description}
        location={tour.location}
        duration={tour.duration}
        price={tour.price}
        img={tour.img}
        rate={tour.rate}
      ></TourCard>)}
    </Box>
  );
}

const gastroTours = [
  {
    title: "Винный маршрут Тосканы",
    description: "Погружение в мир тосканских вин, сыров и пасты среди живописных холмов.",
    location: "Италия, Тоскана",
    duration: 7,
    price: '1500',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Устрицы и сидр Нормандии",
    description: "Свежие морепродукты, сидр и прогулки по побережью Атлантики.",
    location: "Франция, Нормандия",
    duration: 5,
    price: '1300',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Пахлава и специи Востока",
    description: "Путешествие по рынкам и кондитерским древнего Баку.",
    location: "Азербайджан, Баку",
    duration: 4,
    price: '900',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Тапас-тур по Барселоне",
    description: "Гастрономическое приключение в мире тапас, хамона и испанских вин.",
    location: "Испания, Барселона",
    duration: 6,
    price: '1400',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Фермерский опыт в Альпах",
    description: "Дегустация альпийских сыров, традиционных блюд и свежего воздуха.",
    location: "Швейцария, Интерлакен",
    duration: 5,
    price: '1800',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Пельмени и борщ на Байкале",
    description: "Путешествие по сибирской кухне в окружении величественной природы.",
    location: "Россия, Байкал",
    duration: 7,
    price: '1100',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Суши-тур по Осака",
    description: "Изучение настоящего японского стритфуда и секретов суши-мастеров.",
    location: "Япония, Осака",
    duration: 6,
    price: '2000',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Кофе и какао Коста-Рики",
    description: "Экспедиция по кофейным плантациям и шоколадным фермам.",
    location: "Коста-Рика",
    duration: 8,
    price: '1700',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Фиеста вкусов в Мехико",
    description: "Тако, моле, текила и атмосфера нескончаемого праздника.",
    location: "Мексика, Мехико",
    duration: 7,
    price: '1200',
    img: TourImg,
    rate: 4.5,
  },
  {
    title: "Трюфели и паста Пьемонта",
    description: "Охота за белыми трюфелями, уроки пасты и гастрономические ужины.",
    location: "Италия, Пьемонт",
    duration: 9,
    price: '1600',
    img: TourImg,
    rate: 4.5,
  }
];
