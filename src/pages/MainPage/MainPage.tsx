import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPostList } from '../../redux/actions/posts';
import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import { Loading } from '../../components/Loading/Loading';
import { ErrorAlert } from '../../components/ErrorsAlerts/ErrorAlert';

import { RecentTourList } from '../../components/RecentTourList/RecentTourList';
import { SmallSearchForm } from '../../components/SmallSearchForm/SmallSearchForm';
import { Box, Divider, Typography } from '@mui/material';

import { mainPageStyles } from './MainPageStyle';
import { CategoryList } from '../../components/CategoryList/CategoryList';

const MainPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.posts
  );
  useEffect(() => {
    dispatch(getPostList());
  }, [dispatch]);

  if (isLoading) return <Loading />;
  return (
    <Box sx={mainPageStyles.container}>
      {/* {error && <ErrorAlert text={error} isError={true} />} */}
      {error === null && posts.length === 0 && (
        <ErrorAlert text={'No news yet'} isError={false} />
      )}
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
