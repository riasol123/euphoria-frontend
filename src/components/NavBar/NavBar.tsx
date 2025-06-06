import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Box, Button, Divider, IconButton, Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import LogoSvg from '../../assets/logo.svg';
import UserIcon from '../../assets/user.svg';

import { navbarStyles } from './NavBarStyle';
import { getImageUrl } from '../../utils/getImageUrl';
import { whoamiRequest } from '../../redux/actions/auth';


export const NavBar = (): ReactNode => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const { isLogged } = useSelector((state: RootState) => state.auth);
  const { authUser } = useSelector((state: RootState) => state.auth);

  // const whoami = async () => {
  //   try {
  //     const response = await api.get('/auth/whoami');
  //     dispatch(authReceived(response.data));
  //   } catch (error) {
  //     console.error('Ошибка при загрузке данных пользователя:', error);
  //   }
  // };

  useEffect(() => {
    dispatch(whoamiRequest());
  }, [dispatch]);

  return (
    <Box sx={navbarStyles.box}>
      <AppBar position="static" sx={navbarStyles.appBar} elevation={0}>
        <Toolbar>
          <img src={LogoSvg} alt="Logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />

          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Button 
              disableRipple
              sx={{
                ...navbarStyles.button,
                fontWeight: location.pathname === '/' ? '700' : '500'
              }} 
              onClick={() => navigate('/')}
            >
              Главная
            </Button>
            <Divider orientation="vertical" flexItem sx={{ margin: '10px 2px' }} />
            <Button 
              disableRipple
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
                  ...navbarStyles.loginButton,
                  fontWeight: location.pathname === '/auth' ? '700' : '500'
                }}
                disableRipple
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
                  <img src={authUser.avatarPath ? getImageUrl(authUser.avatarPath) : UserIcon} style={{ width: '30px', height: '30px', borderRadius: '20px', objectFit: 'cover' }}></img>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
