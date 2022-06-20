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
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../../GlobalContext';

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
  if (!props.authErrorState) {
    return null;
  }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">Не удалось войти</Alert>
    </Stack>
  );
}

export default function SignInModal({ props }) {
  const { AuthState, setAuthState } = React.useContext(AuthContext);
  const [authErrorState, setAuthErrorState] = React.useState(false);

  const handleSubmit = async (event) => {
    const { REACT_APP_API_V2_URL } = process.env;
    const loginEndpoint = `${REACT_APP_API_V2_URL}/token`;
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await axios
      .post(loginEndpoint, data)
      .then((response) => {
        // Set user access token to AuthContext
        setAuthState({
          ...AuthState,
          accessToken: response.data.access_token,
          authenticated: true,
        });
        setAuthErrorState(false);
        props.closeHandler();
      })
      .catch((error) => {
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 422
        ) {
          setAuthErrorState(true);
        }
      });
  };

  const handleClose = () => {
    setAuthErrorState(false);
    props.closeHandler();
  };

  const handleShowRegister = () => {
    props.closeHandler();
    props.openRegisterHandler();
    setAuthErrorState(false);
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
            Вход
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Имя пользователя"
              name="username"
              autoComplete="username"
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
            <ErrorStack props={{ authErrorState }} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  variant="text"
                  size="small"
                  onClick={handleShowRegister}
                >
                  Не получается войти? Зарегистрироваться
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
}
