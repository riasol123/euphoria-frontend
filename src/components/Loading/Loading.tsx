import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { LoadingStyle } from './LoadingStyle';

export const Loading: FC = () => {
  return (
    <Box sx={LoadingStyle.box}>
      <CircularProgress/>
    </Box>
  );
}