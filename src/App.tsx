import { FC } from 'react';

import MainPage from './pages/MainPage/MainPage';
import { ModalAuth } from './components/ModalWindow/ModalWindow';
import { NavBar } from './components/NavBar/NavBar';
import AuthPage from './pages/AuthPage/AuthPage';
import SearchPage from './pages/SearchPage/SearchPage';

const App: FC = () => {
  return (
    <div className='appContainer'>
      <NavBar />
      <SearchPage />
      <ModalAuth />
    </div>
  );
};

export default App;
