import { useEffect, useMemo, useState } from 'react';
import { signUp } from './api';
import { Input } from './components/Input';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../../shared/components/LanguageSelector';
import {
  Container,
  Card,
  CardContent,
  Alert,
  Button,
  CircularProgress,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export function SignUp() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordRepeat, setPasswordRepeat] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState();
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const { t } = useTranslation();

  useEffect(() => {
    setErrors((prev) => ({ ...prev, username: undefined }));
  }, [username]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, email: undefined }));
  }, [email]);

  useEffect(() => {
    setErrors((prev) => ({ ...prev, password: undefined }));
  }, [password]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage();
    setGeneralError();
    setApiProgress(true);

    try {
      const response = await signUp({
        username,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          setErrors(axiosError.response.data.validationErrors);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError(t('genericError'));
      }
    } finally {
      setApiProgress(false);
    }
  };

  const passwordRepeatError = useMemo(() => {
    if (password && password !== passwordRepeat) {
      return t('passwordMismatch');
    }
    return '';
  }, [password, passwordRepeat]);

  return (
    <Container maxWidth="sm">
      <Box className="signup-wrapper">
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            fontWeight="bold"
            color="primary">
            {t('signUp')}
          </Typography>
        </Box>

        <form onSubmit={onSubmit}>
          <Card elevation={0}>
            <CardContent>
              <Input
                id="username"
                label={t('username')}
                error={errors.username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Input
                id="email"
                label={t('email')}
                error={errors.email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                id="password"
                label={t('password')}
                error={errors.password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
              />
              <Input
                id="passwordRepeat"
                label={t('passwordRepeat')}
                error={passwordRepeatError}
                onChange={(event) => setPasswordRepeat(event.target.value)}
                type="password"
              />

              {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMessage}
                </Alert>
              )}
              {generalError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {generalError}
                </Alert>
              )}

              <Box mt={3} textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={
                    apiProgress || !password || password !== passwordRepeat
                  }
                  startIcon={apiProgress && <CircularProgress size={20} />}
                  sx={{ px: 4, py: 1.5 }}>
                  {t('signUp')}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>

        <Box mt={3} textAlign="center">
          <LanguageSelector />
        </Box>
      </Box>
    </Container>
  );
}
