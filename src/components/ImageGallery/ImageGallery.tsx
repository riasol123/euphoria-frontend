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

const mask = <p><EyeOutlined style={{ marginRight: '5px' }}/>Просмотр</p>;

const ImageGallery: FC = () => {
  return (
    <ConfigProvider locale={ru_RU}>
      <Box sx={styles.container}>
        <Image.PreviewGroup
          items={[TourImg, First, Second, Third]}
        >
          <Image src={TourImg} className='firstImg' preview={{ mask }}/>
          <Image src={First} className='secondImg' preview={{ mask }}/>
          <Image src={Second} className='thirdImg' preview={{ mask: <p>+ 1 фото</p>}}/>
        </Image.PreviewGroup>
      </Box>
    </ConfigProvider>
  );
};

export default ImageGallery;
