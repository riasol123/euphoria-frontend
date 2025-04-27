import { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
} from '@mui/material';

import { changeModalProps } from '../../redux/actions/modal';
import { AppDispatch, RootState } from '../../hooks/getTypedSelector';
import { userLogOut, verificationUser } from '../../redux/actions/auth';
import LogoSvg from '../../assets/logo.svg';

import { navbarStyles } from './NavBarStyle';

const token = localStorage.getItem('authToken');
export const NavBar = (): ReactNode => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (token !== null) {
      dispatch(verificationUser());
    }
  }, []);

  const { authUser, isLogged } = useSelector((state: RootState) => state.auth);

  const openModal = (type: string) => {
    dispatch(changeModalProps({ isOpen: true, type }));
  };

  const tapLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(userLogOut());
  };

  return (
    <Box sx={navbarStyles.box}>
      <AppBar position="static" sx={navbarStyles.appBar} elevation={0}>
        <Toolbar>
          <img src={LogoSvg} alt="Logo"/>
          {!isLogged && (
            <>
              <Button
                sx={navbarStyles.button}
                onClick={() => openModal('Login')}
              >
                Войти
              </Button>
            </>
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
