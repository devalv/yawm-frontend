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
import { AuthContext } from '../../GlobalContext';
import ErrorStack from '../ErrorStack';


export default function ProductEditFormDialog({props}) {
  const { AuthState } = React.useContext(AuthContext);

  const [productName, setProductName] = React.useState();
  const [errorState, setEditErrorState] = React.useState({ type: "", hasError: false});

  const handleClose = () => {
    setEditErrorState({type: "", hasError: false  });
    props.handler(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { REACT_APP_API_V2_URL } = process.env;
    const editEndpoint = `${REACT_APP_API_V2_URL}/wishlist-products/${props.id}`;
    const data = {"name": productName, "substitutable": false, "reserved": false};
    await axios.put(editEndpoint, data).then(() => {
      setEditErrorState({type: "", hasError: false  });
      handleClose();
      window.location.reload();
    }).catch((error) => {
      if ((error.response.status === 400) || (error.response.status === 422)){
        setEditErrorState({type: "invalidData", hasError: true});
      } else if (error.response.status === 401) {
        setEditErrorState({type: "badAuth", hasError: true});
      }
    });
  };

  if ((AuthState.authenticated) && (props.username === AuthState.username)) {
    return (
    <Dialog open={props.open} onClose={handleClose} component="form" onSubmit={handleSubmit}>
        <DialogTitle>Переименование товара</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Укажите новое название товара
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="productName"
              label="Новое название"
              type="string"
              fullWidth
              variant="standard"
              required
              onChange={e => setProductName(e.target.value)}
            />
          <ErrorStack props={{errorState}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" startIcon={<CancelIcon />}>Отменить</Button>
          <Button type="submit" variant="outlined" endIcon={<SendIcon />}>Переименовать</Button>
        </DialogActions>
      </Dialog>
  );
  }
  return null;

}