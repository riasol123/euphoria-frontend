import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet,  } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import { NavBar } from './components/NavBar/NavBar';
import AuthPage from './pages/AuthPage/AuthPage';
import SearchPage from './pages/SearchPage/SearchPage';
import { Box } from '@mui/material';
import TourPage from './pages/TourPage/TourPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import CommonModal from './components/CommonModal/CommonModal';

const Layout: FC = () => {
  return (
    <div className='appContainer'>
      <NavBar />
      <CommonModal></CommonModal>
      <Box className="pageWrapper">
        <Outlet />
      </Box>
    </div>
  );
};

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Дочерние маршруты */}
          <Route index element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="/tour/:id" element={<TourPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
