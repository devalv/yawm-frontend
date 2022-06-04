import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import SignInModal from './auth/modals/SingIn';
import SignUpModal from './auth/modals/SingUp';
import { AuthContext } from './GlobalContext';


function UserAuthButton() {
  const { AuthState } = React.useContext(AuthContext);
  const [modalUserLoginShow, setModalUserLoginShow] = React.useState(false);
  const handleModalUserLoginShow = () => setModalUserLoginShow(true);
  const handleModalUserLoginClose = () => setModalUserLoginShow(false);
  const [modalUserRegisterShow, setModalUserRegisterShow] = React.useState(false);
  const handleModalUserRegisterShow = () => setModalUserRegisterShow(true);
  const handleModalUserRegisterClose = () => setModalUserRegisterShow(false);

  if (AuthState.authenticated) {
    // TODO: @devalv call logout func
    return <Button color="inherit">Выйти</Button>;
  }
  return (
    <>
      <SignInModal props={{"openState": modalUserLoginShow, "closeHandler": handleModalUserLoginClose, "openRegisterHandler": handleModalUserRegisterShow}}/>
      <SignUpModal props={{"openState": modalUserRegisterShow, "closeHandler": handleModalUserRegisterClose, "openLoginHandler": handleModalUserLoginShow}}/>
      <Button color="inherit" onClick={handleModalUserLoginShow}>Войти</Button>
    </>

  );
}

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 2 }} pb={3}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => window.open("https://github.com/devalv/yawm-frontend", "_blank")}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            href="/"
          >
            <img alt="" src="/logo64.png" width="32" height="32"/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Yet another wishlist maker v.0.3
          </Typography>
          <UserAuthButton/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}