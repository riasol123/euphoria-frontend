import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentTour } from '../../redux/actions/tour';

import StarIcon from '../../assets/star.svg';

import { styles } from './TourCardStyle';
import getDaysAmountLiteral from '../../utils/getDaysAmountLiteral';
import formatMoney from '../../utils/formatMoney';

export const TourCard = ({
  id,
  title,
  description,
  location,
  duration,
  price,
  img,
  rate,
  tourData,
}: { 
  id: number,
  title: string,
  description: string,
  location: string,
  duration: number,
  price: string | number,
  img: string,
  rate: string,
  tourData?: any,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    if (tourData) {
      dispatch(setCurrentTour(tourData));
    }
    navigate(`/tour/${id}`);
  };
  const cleanedDescription = description.replace(/^\*{3}.*?\*{3}\s*/g, '');

  return (
    <Card sx={styles.cardContainer} elevation={0}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="246"
          image={img}
          // image={'https://82grrc2b-3001.euw.devtunnels.ms/'+ img}
          alt="tour image"
        />
        <CardContent sx={{ height: '181px' }}>
          <Box sx={styles.topTextContainer}>
          {/* <img src={StarIcon} style={styles.ratingIcon}></img>
            <Typography>
              {rate}
            </Typography> */}
            <Typography>{location}</Typography>
          </Box>
          <Typography sx={styles.title}>
            {title}
          </Typography>
          <Typography sx={styles.description}>
            {cleanedDescription}
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
