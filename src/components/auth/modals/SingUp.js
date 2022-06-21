import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  flexDirection: 'column',
  alignItems: 'center',
  display: 'flex',
};

function ErrorStack({ props }) {
  if (props.loginState !== 'error') {
    return null;
  }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Не удалось зарегистрироваться</Alert>
    </Stack>
  );
}

function SuccessStack({ props }) {
  if (props.loginState !== 'success') {
    return null;
  }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="success">Добро пожаловать. Выполните вход.</Alert>
    </Stack>
  );
}

export default function SignUpModal({ props }) {
  const [loginState, setLoginState] = React.useState('halt');
  const handleSubmit = async (event) => {
    const { REACT_APP_API_V2_URL } = process.env;
    const registerEndpoint = `${REACT_APP_API_V2_URL}/users/create`;
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      username: form.get('username'),
      password: form.get('password'),
    };
    await axios
      .post(registerEndpoint, data)
      .then(() => {
        setLoginState('success');
      })
      .catch((error) => {
        if (
          error.response.status === 422 ||
          error.response.status === 403 ||
          error.response.status === 400
        ) {
          setLoginState('error');
        }
      });
  };

  const handleShowLogin = () => {
    setLoginState('halt');
    props.closeHandler();
    props.openLoginHandler();
  };

  const handleClose = () => {
    setLoginState('halt');
    props.closeHandler();
  };

  return (
    <Modal
      open={props.openState}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={style}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Имя пользователя"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  inputProps={{
                    minLength: 5,
                    maxLength: 11,
                    pattern: '.{5,11}',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Пароль"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputProps={{
                    minLength: 6,
                    maxLength: 24,
                    pattern: '.{6,24}',
                  }}
                />
              </Grid>
            </Grid>
            <ErrorStack props={{ loginState }} />
            <SuccessStack props={{ loginState }} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button variant="text" size="small" onClick={handleShowLogin}>
                  Уже зарегистрированы? Войти
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
