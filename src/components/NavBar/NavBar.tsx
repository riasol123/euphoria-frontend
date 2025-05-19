import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Button, Divider, IconButton, Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import LogoSvg from '../../assets/logo.svg';
import UserIcon from '../../assets/user.svg';

import { navbarStyles } from './NavBarStyle';
import axios from 'axios';
import { authReceived } from '../../redux/actions/auth';


export const NavBar = (): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const { isLogged } = useSelector((state: RootState) => state.auth);
  const { authUser } = useSelector((state: RootState) => state.auth);

  const whoami = async () => {

    const url = 'https://82grrc2b-3001.euw.devtunnels.ms/auth/whoami';
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      dispatch(authReceived(response.data));
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  useEffect(() => {
    whoami();
  }, []);

  console.log(authUser)

  return (
    <Box sx={navbarStyles.box}>
      <AppBar position="static" sx={navbarStyles.appBar} elevation={0}>
        <Toolbar>
          <img src={LogoSvg} alt="Logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />

          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Button 
              sx={{
                ...navbarStyles.button,
                fontWeight: location.pathname === '/' ? '700' : '500'
              }} 
              onClick={() => navigate('/')}
            >
              Главная
            </Button>
            <Button 
              sx={{
                ...navbarStyles.button,
                fontWeight: location.pathname === '/search' ? '700' : '500'
              }}
              onClick={() => navigate('/search')}
            >
              Поиск
            </Button>
            <Divider orientation="vertical" flexItem sx={{ margin: '10px 2px' }} />
            {!isLogged && (
              <Button
                sx={{
                  ...navbarStyles.button,
                  fontWeight: location.pathname === '/auth' ? '700' : '500',
                }}
                onClick={() => navigate('/auth')}
              >
                Войти
              </Button>
            )}
            {isLogged && (
              <>
                <IconButton 
                  sx={{
                    ...navbarStyles.userIcon,
                    '& img': {
                      border: location.pathname === '/profile' ? '2px solid #393939' : 'none'
                    }
                  }} 
                  onClick={() => navigate('/profile')}
                > 
                  <img src={authUser.avatarPath ? 'https://82grrc2b-3001.euw.devtunnels.ms/' + authUser.avatarPath : UserIcon} style={{ width: '30px', height: '30px', borderRadius: '20px', }}></img>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
