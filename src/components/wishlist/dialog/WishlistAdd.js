import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { AuthContext } from '../../GlobalContext';
import ErrorStack from '../ErrorStack';

const addWishlistStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export default function WishlistAddFormDialog() {
  const navigate = useNavigate();
  const { AuthState } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [productUrl, setProductUrl] = React.useState();
  const [errorState, setCreateErrorState] = React.useState({
    type: '',
    hasError: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCreateErrorState({ type: '', hasError: false });
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { REACT_APP_API_V2_URL } = process.env;
    const createEndpoint = `${REACT_APP_API_V2_URL}/wishlists`;
    const data = { product_urls: [{ url: productUrl }] };
    await axios
      .post(createEndpoint, data)
      .then((response) => {
        setCreateErrorState({ type: '', hasError: false });
        handleClose();
        navigate(`/wishlist/${response.data.id}`);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422) {
          setCreateErrorState({ type: 'invalidData', hasError: true });
        } else if (error.response.status === 401) {
          setCreateErrorState({ type: 'badAuth', hasError: true });
        }
      });
  };

  if (AuthState.authenticated) {
    return (
      <>
        <Fab
          color="primary"
          aria-label="add"
          style={addWishlistStyle}
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={open}
          onClose={handleClose}
          component="form"
          onSubmit={handleSubmit}
        >
          <DialogTitle>Добавить список</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Вставьте прямую ссылку на страницу с товаром.
              <br />
              Добавить дополнительные товары можно будет внутри списка.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="productUrl"
              label="Ссылка на товар"
              type="url"
              fullWidth
              variant="standard"
              required
              onChange={(e) => setProductUrl(e.target.value)}
            />
            <ErrorStack props={{ errorState }} />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              variant="outlined"
              startIcon={<CancelIcon />}
            >
              Отменить
            </Button>
            <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
              Создать
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
  return null;
}
