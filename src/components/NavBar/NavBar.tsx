import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Button, Divider, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // ✅ Импорт навигации

import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import { userLogOut, verificationUser } from '../../redux/actions/auth';
import LogoSvg from '../../assets/logo.svg';

import { navbarStyles } from './NavBarStyle';

const token = localStorage.getItem('authToken');

export const NavBar = (): ReactNode => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); // ✅ Хук для переходов

  useEffect(() => {
    if (token !== null) {
      dispatch(verificationUser());
    }
  }, []);

  const { authUser, isLogged } = useSelector((state: RootState) => state.auth);

  const tapLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(userLogOut());
  };

  return (
    <Box sx={navbarStyles.box}>
      <AppBar position="static" sx={navbarStyles.appBar} elevation={0}>
        <Toolbar>
          <img src={LogoSvg} alt="Logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
          {!isLogged && (
            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
              <Button sx={navbarStyles.button} onClick={() => navigate('/')}>
                Главная
              </Button>
              <Button sx={navbarStyles.button} onClick={() => navigate('/search')}>
                Поиск
              </Button>
              <Divider orientation="vertical" flexItem sx={{ margin: '10px 2px' }} />
              <Button
                sx={navbarStyles.button}
                onClick={() => navigate('/auth')} // ✅ Перенаправление на страницу авторизации
              >
                Войти
              </Button>
            </Box>
          )}
          {isLogged && (
            <>
              <Button sx={navbarStyles.button}>{authUser?.email}</Button>
              <Button sx={navbarStyles.button} onClick={tapLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
