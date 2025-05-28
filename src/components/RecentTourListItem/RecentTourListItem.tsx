import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Typography, Box, Skeleton } from '@mui/material';
import { itemStyles } from './RecentTourListItemStyle';

interface RecentTourListItemProps {
  img: string;
  title: string;
  day: number;
  month: string;
  featured: boolean;
  onMouseEnter: () => void;
  onImageLoad: () => void;
  showSkeleton: boolean;
}

export const RecentTourListItem = ({
  img,
  title,
  day,
  month,
  featured,
  onMouseEnter,
  onImageLoad,
  showSkeleton,
}: RecentTourListItemProps) => {
  const navigate = useNavigate(); // Инициализируем navigate

  // Обработчик клика
  const handleClick = () => {
    navigate(`/tour/1`); // Переходим на страницу с детальной информацией о туре
  };

  // Без transition для скелетона, с transition только для настоящих карточек
  const containerStyle = featured
    ? { ...itemStyles.featured, transition: showSkeleton ? 'none' : itemStyles.featured.transition }
    : { ...itemStyles.default, transition: showSkeleton ? 'none' : itemStyles.default.transition };

  return (
    <ImageListItem
      onMouseEnter={onMouseEnter}
      onClick={handleClick} // Добавляем обработчик клика
      sx={containerStyle}
    >
      {showSkeleton && (
        <Box
          sx={{
            ...containerStyle,
            backgroundColor: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
            transition: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          {/* Скелетон для названия и даты */}
          <ImageListItemBar
            sx={{
              ...itemStyles.imageListItemBar,
              background: 'none',
              zIndex: 3,
            }}
            title={
              featured ? (
                <>
                  <Typography sx={itemStyles.title}>
                    <Skeleton width="80%" />
                  </Typography>
                  <Typography align="center">
                    <Skeleton width={60} height={60} />
                  </Typography>
                </>
              ) : (
                <Box sx={itemStyles.verticalDate}>
                  <Typography>
                    <Skeleton width={100} />
                  </Typography>
                </Box>
              )
            }
          />
        </Box>
      )}
      <img 
        src={img} 
        alt={title} 
        loading="lazy" 
        onLoad={onImageLoad}
        style={{ opacity: showSkeleton ? 0 : 1 }}
      />
      {!showSkeleton && (
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
      )}
    </ImageListItem>
  );
};
