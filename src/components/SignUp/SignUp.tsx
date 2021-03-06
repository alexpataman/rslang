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
import { UsersApi } from '../../services/RSLangApi/UsersApi';
import { useAppDispatch } from '../../store/hooks';
import * as userSlice from '../../store/user/user.slice';
import { IAuthForm, ValidationErrors } from '../../types/common';
import { ValidationError } from '../../utils/errors/ValidationError';
import {
  getValidationErrorText,
  isValid,
  resetFieldValidation,
} from '../../utils/helpers/validationErrors';

export const SignUp = ({ toggleView }: IAuthForm) => {
  const usersApi = useMemo(() => new UsersApi(), []);
  const signinApi = useMemo(() => new SigninApi(), []);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [alert, setAlert] = useState<string>();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = (data.get('name') as string) || '';
    const email = (data.get('email') as string) || '';
    const password = (data.get('password') as string) || '';

    try {
      await usersApi.createUser({ email, name, password });
      try {
        const result = await signinApi.signin({ email, password });
        dispatch(userSlice.login(result));
      } catch (error) {
        if (error instanceof Error && error.message) {
          setAlert(error.message);
        }
      }
    } catch (error) {
      if (error instanceof ValidationError && error.data) {
        setValidationErrors(
          error.data.error.errors.reduce(
            (acc, el) => Object.assign(acc, { [el.path[0]]: el.message }),
            {} as ValidationErrors
          )
        );
      } else if (error instanceof Error && error.message) {
        setAlert(error.message);
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const key = event.target.name;
    if (validationErrors[key]) {
      setValidationErrors(resetFieldValidation(validationErrors, key));
    }
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
          ??????????????????????
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          onChange={handleChange}
          sx={{ mt: 3 }}
          noValidate
        >
          <Grid container spacing={2}>
            {alert && (
              <Grid item xs={12} sm={12}>
                <Alert severity="error">{alert}</Alert>
              </Grid>
            )}

            <Grid item xs={12} sm={12}>
              <TextField
                error={isValid(validationErrors, 'name')}
                helperText={getValidationErrorText(validationErrors, 'name')}
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                label="??????"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={isValid(validationErrors, 'email')}
                helperText={getValidationErrorText(validationErrors, 'email')}
                required
                fullWidth
                id="email"
                label="Email ??????????"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={isValid(validationErrors, 'password')}
                helperText={getValidationErrorText(
                  validationErrors,
                  'password'
                )}
                required
                fullWidth
                name="password"
                label="????????????"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ????????????????????????????????????
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link
                href="#"
                variant="body2"
                onClick={(event) => toggleView(event)}
              >
                ?????? ???????? ?????????????? ?????????????
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
