
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';

import StarIcon from '../../assets/star.svg';

import { styles } from './TourCardStyle';
import getDaysAmountLiteral from '../../utils/getDaysAmountLiteral';
import formatMoney from '../../utils/formatMoney';

export const TourCard = ({
  title,
  description,
  location,
  duration,
  price,
  img,
  rate,
}: { 
  title: string,
  description: string,
  location: string,
  duration: number,
  price: string,
  img: string,
  rate: number,
}) => {
  return (
    <Card sx={styles.cardContainer} elevation={0}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="246"
          image={img}
          alt="tour image"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={styles.topTextContainer}>
          <img src={StarIcon} style={styles.ratingIcon}></img>
            <Typography>
              {rate}
            </Typography>
            <Typography>{location}</Typography>
          </Box>
          <Typography sx={styles.title}>
            {title}
          </Typography>
          <Typography sx={styles.description}>
            {description}
          </Typography>
          <Box sx={styles.bottomTextContainer}>
            <Typography>
             {formatMoney(price)} ₽
            </Typography>
            <Typography>
             / {duration} {getDaysAmountLiteral(duration)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
