import { FC } from 'react';
import { ConfigProvider, Image } from 'antd';
import ru_RU from 'antd/locale/ru_RU';
import { Box } from '@mui/material';
import { EyeOutlined } from '@ant-design/icons';

import TourImg from '../../assets/tour.jpg';
import First from '../../assets/first_temp.jpg';
import Second from '../../assets/second_temp.jpg';
import Third from '../../assets/third_temp.jpg';

import { styles } from './ImageGalleryStyles';
import { getImageUrl } from '../../utils/getImageUrl';

const mask = <p><EyeOutlined style={{ marginRight: '5px' }}/>Просмотр</p>;

const ImageGallery: FC<{ tour?: any }> = ({ tour }) => {
  const images = tour?.photos && tour.photos.length > 0 ? tour.photos : [TourImg, First, Second, Third];
  const imagesUrls = images.map((image) => tour.photos?.length > 0 ? getImageUrl(image) : image);

  return (
    <ConfigProvider locale={ru_RU}>
      <Box sx={styles.container}>
        <Image.PreviewGroup items={imagesUrls}>
          {imagesUrls.map((img: string, idx: number) => (
            <Image key={img} src={img} className={idx === 0 ? 'firstImg' : idx === 1 ? 'secondImg' : 'thirdImg'} preview={{ mask: idx === 2 && images.length > 3 ? <p>+ {images.length - 3} фото</p> : mask }} />
          ))}
        </Image.PreviewGroup>
      </Box>
    </ConfigProvider>
  );
};

export default ImageGallery;
