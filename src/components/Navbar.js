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

// TODO: @devalv logout

export default function ButtonAppBar() {
  const [modalUserLoginShow, setModalUserLoginShow] = React.useState(false);
  const handleModalUserLoginShow = () => setModalUserLoginShow(true);
  const handleModalUserLoginClose = () => setModalUserLoginShow(false);
  const [modalUserRegisterShow, setModalUserRegisterShow] = React.useState(false);
  const handleModalUserRegisterShow = () => setModalUserRegisterShow(true);
  const handleModalUserRegisterClose = () => setModalUserRegisterShow(false);
  return (
    <>
      <SignInModal props={{"openState": modalUserLoginShow, "closeHandler": handleModalUserLoginClose, "openRegisterHandler": handleModalUserRegisterShow}}/>
      <SignUpModal props={{"openState": modalUserRegisterShow, "closeHandler": handleModalUserRegisterClose, "openLoginHandler": handleModalUserLoginShow}}/>
      <Box sx={{ flexGrow: 1 }} pb={3}>
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
            <Button color="inherit" onClick={handleModalUserLoginShow}>Войти</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}