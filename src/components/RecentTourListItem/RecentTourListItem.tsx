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
  return (
    <ImageListItem
      onMouseEnter={onMouseEnter}
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
