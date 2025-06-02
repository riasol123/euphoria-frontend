import { FC, useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, CircularProgress } from '@mui/material';
import { Form, Input } from 'antd';
import { authGenerateVerifyCodeRequest, authVerifyEmailRequest, authRegisterRequest } from '../../redux/actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../hooks/getTypedSelector';
import { emailVerificationModalStyles as styles } from './EmailVerificationModalStyles';
import { useNavigate } from 'react-router-dom';

interface EmailVerificationModalProps {
  open: boolean;
  onClose: () => void;
  email: string;
  name: string;
  surname: string;
  password: string;
}

const EmailVerificationModal: FC<EmailVerificationModalProps> = ({ open, onClose, email, name, surname, password }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const [canResendCode, setCanResendCode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isVerifying, verificationError, isGeneratingCode, isLogged } = useSelector((state: any) => state.auth);

  // DEBUG: выводим состояние стора и локальное состояние
  console.log('Redux:', { isGeneratingCode, isVerifying, verificationError });
  console.log('Local:', { isCodeSent, canResendCode, timeLeft, verificationCode });

  // Сбрасываем состояние при открытии модалки
  useEffect(() => {
    if (open) {
      setIsCodeSent(false);
      setVerificationCode('');
      setTimeLeft(60);
      setCanResendCode(false);
      setIsVerified(false);
    }
  }, [open]);

  // Следим за успешной генерацией кода
  useEffect(() => {
    if (isGeneratingCode === false && !verificationError) {
      setIsCodeSent(true);
    }
  }, [isGeneratingCode, verificationError]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0 && isCodeSent) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setCanResendCode(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isCodeSent]);

  // После успешной верификации кода выставляем isVerified
  useEffect(() => {
    if (isVerifying === false && !verificationError && isCodeSent && verificationCode.length === 6) {
      setIsVerified(true);
    }
  }, [isVerifying, verificationError, isCodeSent, verificationCode]);

  // Только после isVerified отправляем регистрацию
  useEffect(() => {
    if (isVerified) {
      dispatch(authRegisterRequest({ email, password, name, surname }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerified]);

  // После успешной регистрации делаем редирект
  useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, navigate]);

  const handleSendCode = () => {
    dispatch(authGenerateVerifyCodeRequest({ email, name }));
  };

  const handleVerifyCode = () => {
    dispatch(authVerifyEmailRequest({ email, code: verificationCode }));
  };

  const handleResendCode = () => {
    setTimeLeft(60);
    setCanResendCode(false);
    setVerificationCode('');
    dispatch(authGenerateVerifyCodeRequest({ email, name }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      open={open}
      onClose={() => !isVerifying && onClose()}
      sx={styles.modal}
    >
      <Box sx={styles.container}>
        <Typography variant="h6" sx={styles.title}>
          Подтверждение почты
        </Typography>
        
        {!isCodeSent ? (
          <>
            <Typography sx={styles.text}>
              Для завершения регистрации необходимо подтвердить вашу почту <b>{email}</b>.
              Мы отправим на него код подтверждения.
            </Typography>
            <Button
              variant="contained"
              disableElevation
              onClick={handleSendCode}
              disabled={isGeneratingCode}
              sx={styles.button}
            >
              {isGeneratingCode ? <CircularProgress size={24} /> : 'Отправить код'}
            </Button>
          </>
        ) : (
          <>
            <Typography sx={styles.text}>
              Мы отправили код подтверждения на вашу почту {email}
            </Typography>
            
            <Form.Item hasFeedback>
              <Input.OTP
                length={6}
                onChange={(value) => setVerificationCode(value)}
                value={verificationCode}
                style={{ width: '100%' }}
              />
            </Form.Item>

            {verificationError && (
              <Typography sx={styles.errorText}>{verificationError}</Typography>
            )}

            {canResendCode ? (
              <Button
                variant="contained"
                disableElevation
                onClick={handleResendCode}
                disabled={isGeneratingCode}
                sx={styles.button}
              >
                {isGeneratingCode ? <CircularProgress size={24} /> : 'Отправить код повторно'}
              </Button>
            ) : (
              <>
                <Typography sx={styles.text}>
                  Повторная отправка через {formatTime(timeLeft)}
                </Typography>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleVerifyCode}
                  disabled={isVerifying || !verificationCode || verificationCode.length !== 6}
                  sx={styles.button}
                >
                  {isVerifying ? <CircularProgress size={24} /> : 'Подтвердить'}
                </Button>
              </>
            )}
          </>
        )}
      </Box>
    </Modal>
  );
};

export default EmailVerificationModal; 