import { useMemo, useState } from 'react';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { SigninApi } from '../../services/RSLangApi/SigninApi';
import { User } from '../../services/User';
import { useAppDispatch } from '../../store/hooks';
import * as userSlice from '../../store/user/user.slice';
import { IAuthForm } from '../../types/common';

export const SignIn = ({ toggleView }: IAuthForm) => {
  const signinApi = useMemo(() => new SigninApi(), []);
  const [alert, setAlert] = useState<string>();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = (data.get('email') as string) || '';
    const password = (data.get('password') as string) || '';

    try {
      const result = await signinApi.signin({ email, password });
      User.login(result);
      dispatch(userSlice.login(result));
    } catch (error) {
      if (error instanceof Error && error.message) {
        setAlert('Вход не выполнен. Проверьте данные.');
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (alert) {
      setAlert(undefined);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          onChange={handleChange}
          sx={{ mt: 1 }}
        >
          {alert && (
            <Grid item xs={12} sm={12}>
              <Alert severity="error">{alert}</Alert>
            </Grid>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email адрес"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Вход
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2" onClick={toggleView}>
                {'Нет учетной записи?'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
