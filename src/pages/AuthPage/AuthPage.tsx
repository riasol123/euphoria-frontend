import { FC, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

import image from '../../assets/auth_img.jpg';

import { authPageStyles } from './AuthPageStyle';

const AuthPage: FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(prev => !prev);
  };

  return (
    <Box sx={authPageStyles.container}>
      <Box sx={authPageStyles.authForm}>
        <Typography sx={authPageStyles.loginTitle}>
          {isLogin ? 'Вход' : 'Регистрация'}
        </Typography>
        <Typography sx={authPageStyles.loginDescription}>
          {isLogin
            ? 'Введите свою почту и пароль для входа.'
            : 'Создайте аккаунт, заполнив форму ниже.'}
        </Typography>

        {!isLogin && (
          <TextField
            label="Имя"
            name="name"
            fullWidth
            sx={authPageStyles.input}
          />
        )}
        <TextField
          label="Почта"
          name="email"
          type="email"
          fullWidth
          sx={authPageStyles.input}
        />
        <TextField
          label="Пароль"
          name="password"
          type="password"
          fullWidth
          sx={authPageStyles.input}
        />
        {!isLogin && (
          <TextField
            label="Подтвердите пароль"
            name="confirmPassword"
            type="password"
            fullWidth
            sx={authPageStyles.input}
          />
        )}

        {isLogin && (
          <Typography sx={authPageStyles.forgottenPassword}>
            Забыли пароль?
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          disableElevation
          sx={authPageStyles.button}
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </Button>

        <Box sx={authPageStyles.optionAction}>
          <Typography>
            {isLogin ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
          </Typography>
          <Typography
            onClick={toggleForm}
            style={{ cursor: 'pointer' }}
          >
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </Typography>
        </Box>
      </Box>
      <img src={image} />
    </Box>
  );
};

export default AuthPage;
