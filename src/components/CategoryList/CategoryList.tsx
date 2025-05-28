import { useEffect, useState } from 'react';
import { Box, IconButton, Skeleton, Card, CardHeader, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { categoryListStyles } from './CategoryListStyle';
import { CategoryListItem } from '../CategoryListItem/CategoryListItem';
import { RootState } from '../../types/rootState';
import { fetchCategoriesRequest } from '../../redux/actions/categories';
import { Category } from '../../types/category';
import arrowLeft from '../../assets/arrow_left.svg';
import arrowRight from '../../assets/arrow_right.svg';
import { itemStyles } from '../CategoryListItem/CategoryListStyleItem';

const ITEMS_PER_PAGE = 4;
const ITEM_WIDTH = 290; // 270px width + 20px gap

export const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categories?.items || []);
  const loading = useSelector((state: RootState) => state.categories?.loading || false);
  const [startIndex, setStartIndex] = useState(0);
  
  useEffect(() => {
    dispatch(fetchCategoriesRequest());
  }, []);

  const maxStartIndex = Math.max(0, categories.length - ITEMS_PER_PAGE);
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex < maxStartIndex;

  const handlePrev = () => {
    if (canGoBack) {
      setStartIndex(prev => Math.max(0, prev - 1));
    }
  };
  
  const handleNext = () => {
    if (canGoForward) {
      setStartIndex(prev => Math.min(maxStartIndex, prev + 1));
    }
  };

  if (loading) {
    return (
      <Box sx={categoryListStyles.container}>
        <Box sx={categoryListStyles.visibleContainer}>
          <Box sx={categoryListStyles.sliderContainer}>
            {[...Array(4)].map((_, idx) => (
              <Card key={idx} sx={itemStyles.card} elevation={0}>
                <CardHeader
                  avatar={<Skeleton variant="circular" width={30} height={30} />}
                  title={<Skeleton variant="text" width="100%" height={28} />}
                  sx={itemStyles.header}
                />
                <CardContent>
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Skeleton variant="text" width="90%" height={20} />
                  <Skeleton variant="text" width="70%" height={20} />
                  <Skeleton variant="text" width="40%" height={20} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={categoryListStyles.container}>
      <Box sx={categoryListStyles.visibleContainer}>
        <Box
          sx={{
            ...categoryListStyles.sliderContainer,
            transform: `translateX(-${startIndex * ITEM_WIDTH}px)`,
          }}
        >
          {categories.map((category: Category) => (
            <CategoryListItem
              key={category.id}
              icon={category.iconPath || ''}
              title={category.title}
              description={category.description}
            />
          ))}
        </Box>
      </Box>

      {canGoBack && (
        <IconButton
          onClick={handlePrev}
          sx={categoryListStyles.arrowRight}
          className="arrow-button"
        >
          <img src={arrowLeft} alt="Previous"/>
        </IconButton>
      )}

      {canGoForward && (
        <IconButton
          onClick={handleNext}
          sx={categoryListStyles.arrowLeft}
          className="arrow-button"
        >
          <img src={arrowRight} alt="Next"/>
        </IconButton>
      )}
    </Box>
  );
};
