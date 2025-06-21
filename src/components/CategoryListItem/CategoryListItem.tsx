import { Typography, Card, CardHeader, CardContent } from '@mui/material';
import { itemStyles } from './CategoryListStyleItem';
import { getImageUrl } from '../../utils/getImageUrl';

export const CategoryListItem = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <Card sx={itemStyles.card} elevation={0}>
      <CardHeader
        avatar={<img src={getImageUrl(icon)} />}
        title={title}
        sx={itemStyles.header}
      />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};
