import * as React from 'react';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { AuthContext } from '../../GlobalContext';

const addProductStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 100,
  left: 'auto',
  position: 'fixed',
};

const editNameStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export default function WishlistEditFab({ props }) {
  const { AuthState } = React.useContext(AuthContext);
  if (AuthState.authenticated && props.username === AuthState.username) {
    return (
      <>
        <Fab
          color="success"
          aria-label="edit"
          style={addProductStyle}
          onClick={props.showEditWishlistName}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="primary"
          aria-label="add"
          style={editNameStyle}
          onClick={props.showAddProduct}
        >
          <AddIcon />
        </Fab>
      </>
    );
  }
  return null;
}
