import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../GlobalContext';
import ErrorStack from '../ErrorStack';

export default function ProductAddFormDialog({ props }) {
  const { id } = useParams();
  const { AuthState } = React.useContext(AuthContext);

  const [productUrl, setProductUrl] = React.useState();
  const [errorState, setAddErrorState] = React.useState({
    type: '',
    hasError: false,
  });

  const handleClose = () => {
    setAddErrorState({ type: '', hasError: false });
    props.handler(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { REACT_APP_API_V2_URL } = process.env;
    const addEndpoint = `${REACT_APP_API_V2_URL}/wishlists/${id}/products-add`;
    const data = { product_urls: [{ url: productUrl }] };
    await axios
      .put(addEndpoint, data)
      .then(() => {
        setAddErrorState({ type: '', hasError: false });
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 422) {
          setAddErrorState({ type: 'invalidData', hasError: true });
        } else if (error.response.status === 401) {
          setAddErrorState({ type: 'badAuth', hasError: true });
        }
      });
  };

  if (AuthState.authenticated && props.username === AuthState.username) {
    return (
      <Dialog
        open={props.open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit}
      >
        <DialogTitle>Добавить товар</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вставьте прямую ссылку на страницу с товаром.
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
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return null;
}
