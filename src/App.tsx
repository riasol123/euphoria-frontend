import { FC } from 'react';

import MainPage from './pages/MainPage/MainPage';
import { NavBar } from './components/NavBar/NavBar';
import AuthPage from './pages/AuthPage/AuthPage';
import SearchPage from './pages/SearchPage/SearchPage';
import { Box } from '@mui/material';

const App: FC = () => {
  return (
    <div className='appContainer'>
      <NavBar />
      <Box className="pageWrapper">
        <SearchPage />
      </Box>
    </div>
  );
};

export default App;
