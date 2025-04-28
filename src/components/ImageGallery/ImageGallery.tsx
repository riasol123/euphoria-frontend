import { FC } from 'react';
import { Image } from 'antd';
import TourImg from '../../assets/tour.jpg';
import First from '../../assets/first_temp.jpg';
import Second from '../../assets/second_temp.jpg';
import Third from '../../assets/third_temp.jpg';

import { styles } from './ImageGalleryStyles';
import { Box } from '@mui/material';

const ImageGallery: FC = () => {
  return (
    <Box sx={styles.container}>
      <Image.PreviewGroup
      items={[
        TourImg,
        First,
        Second,
        Third,
      ]}
    >
      <Image
        src={TourImg}
        className='firstImg'
      />
          <Image
        src={First}
        className='secondImg'

      />
          <Image
        src={Second}
        className='thirdImg'
      />
      </Image.PreviewGroup>
    </Box>
  );
};

export default ImageGallery;
