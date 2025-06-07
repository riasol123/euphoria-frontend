import { FC } from 'react';

import { RecentTourList } from '../../components/RecentTourList/RecentTourList';
import { SmallSearchForm } from '../../components/SmallSearchForm/SmallSearchForm';
import { Box, Divider, Typography } from '@mui/material';

import { mainPageStyles } from './MainPageStyle';
import { CategoryList } from '../../components/CategoryList/CategoryList';

const MainPage: FC = () => {

  return (
    <Box sx={mainPageStyles.container}>
      <Box sx={mainPageStyles.searchContainer}>
        <SmallSearchForm></SmallSearchForm>
        <RecentTourList></RecentTourList>
      </Box>
      <Box sx={mainPageStyles.categories}>
        <Box>
          <Divider />
          <Typography>Популярные категории</Typography>
          <Divider />
        </Box>
        <CategoryList></CategoryList>
      </Box>
    </Box>
  );
};

export default MainPage;
