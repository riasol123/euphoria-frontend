import { FC, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios'; // Импортируем axios

import image from '../../assets/auth_img.jpg';
import { authPageStyles } from './AuthPageStyle';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../hooks/getTypedSelector';
import { authReceived } from '../../redux/actions/auth';
import { useNavigate } from 'react-router-dom';

const AuthPage: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();


  const toggleForm = () => {
    setIsLogin(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isLogin ? 'https://82grrc2b-3001.euw.devtunnels.ms/auth/login' : 'https://82grrc2b-3001.euw.devtunnels.ms/auth/registration';
    const payload = isLogin
      ? { email, password }
      : { email, name, surname, password };

    try {
      const response = await axios.post(url, payload);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
      }

      dispatch(authReceived(response.data));
      navigate('/');
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {!isLogin && (
          <TextField
            label="Фамилия"
            name="surname"
            fullWidth
            sx={authPageStyles.input}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        )}

        <TextField
          label="Почта"
          name="email"
          type="email"
          fullWidth
          sx={authPageStyles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Пароль"
          name="password"
          type="password"
          fullWidth
          sx={authPageStyles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleSubmit}
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
