import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Typography, Box } from '@mui/material';
import { itemStyles } from './RecentTourListItemStyle';

export const RecentTourListItem = ({
  img,
  title,
  day,
  month,
  featured,
  onMouseEnter,
}: {
  img: string;
  title: string;
  day: number;
  month: string;
  featured: boolean;
  onMouseEnter: () => void;
}) => {
  const navigate = useNavigate(); // Инициализируем navigate

  // Обработчик клика
  const handleClick = () => {
    navigate(`/tour/1`); // Переходим на страницу с детальной информацией о туре
  };

  return (
    <ImageListItem
      onMouseEnter={onMouseEnter}
      onClick={handleClick} // Добавляем обработчик клика
      sx={featured ? itemStyles.featured : itemStyles.default}
    >
      <img src={img} alt={title} loading="lazy" />
      <ImageListItemBar
        sx={itemStyles.imageListItemBar}
        title={
          featured ? (
            <>
              <Typography sx={itemStyles.title}>{title}</Typography>
              <Typography align="center">
                {day}
                <br />
                {month}
              </Typography>
            </>
          ) : (
            <Box sx={itemStyles.verticalDate}>
              <Typography>
                {day} {month}
              </Typography>
            </Box>
          )
        }
      />
    </ImageListItem>
  );
};
