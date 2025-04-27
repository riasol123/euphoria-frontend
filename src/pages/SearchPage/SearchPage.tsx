import { FC } from 'react';
import { Box } from '@mui/material';

import { searchPageStyles } from './SearchPageStyle';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { FilterBar } from '../../components/FilterBar/FilterBar';

const SearchPage: FC = () => {
  return (
    <Box sx={searchPageStyles.container}>
      <SearchBar></SearchBar>
      <FilterBar></FilterBar>
    </Box>
  );
};

export default SearchPage;
