import { FC } from 'react';
import { Box } from '@mui/material';

import { searchPageStyles } from './SearchPageStyle';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { TourCardList } from '../../components/TourCardList/TourCardList';

const SearchPage: FC = () => {
  return (
    <Box sx={searchPageStyles.container}>
      <SearchBar></SearchBar>
      <Box sx={searchPageStyles.main}>
        <FilterBar></FilterBar>
        <TourCardList></TourCardList>
      </Box>
    </Box>
  );
};

export default SearchPage;
