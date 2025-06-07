import { FC, useState } from 'react';
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { authLoginRequest } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import image from '../../assets/auth_img.jpg';
import { authPageStyles } from './AuthPageStyle';
import { AppDispatch } from '../../hooks/getTypedSelector';
import EmailVerificationModal from '../../components/EmailVerificationModal/EmailVerificationModal';
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

const AuthPage: FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const toggleForm = () => {
    setIsLogin(prev => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(authLoginRequest({ email, password }));
    } else {
      setShowVerificationModal(true);
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
          type={showPassword ? 'text' : 'password'}
          fullWidth
          sx={authPageStyles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                  sx={{ p: 0.5, background: 'none', '&:hover': { background: 'none' }, '&:active': { background: 'none' }, mr: 0, opacity: 0.5 }}
                >
                  {showPassword ? <VisibilityOffOutlined sx={{ fontSize: 20 }} /> : <VisibilityOutlined sx={{ fontSize: 20 }} />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {!isLogin && (
          <TextField
            label="Подтвердите пароль"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            fullWidth
            sx={authPageStyles.input}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => setShowConfirmPassword((show) => !show)}
                    edge="end"
                    sx={{ p: 0.5, background: 'none', '&:hover': { background: 'none' }, '&:active': { background: 'none' }, mr: 0, opacity: 0.5 }}
                  >
                    {showConfirmPassword ? <VisibilityOffOutlined sx={{ fontSize: 20 }} /> : <VisibilityOutlined sx={{ fontSize: 20 }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

      <EmailVerificationModal
        open={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={email}
        name={name}
        surname={surname}
        password={password}
      />
    </Box>
  );
};

export default AuthPage;
