import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, } from '@mui/material';
import { formatRelative, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AuthContext } from '../../GlobalContext';
import { generateLightColorHex, generateDarkColorHex } from '../../Utils';


function ActionButtons({props}) {
  const { AuthState } = React.useContext(AuthContext);
  const handleDelete = async () => {
    const { REACT_APP_API_V1_URL } = process.env;
    const deleteEndpoint = `${REACT_APP_API_V1_URL}/wishlist/${props.id}`;
    await axios.delete(deleteEndpoint);
    window.location.reload();
  };

  // Only owner can delete card
  if ((AuthState.authenticated) && (props.username === AuthState.username)) {
    return (
        <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleDelete}
        >
          <DeleteIcon color="error"/>
        </IconButton>
    );
  }
  return null;
}

export default function WishlistItem({props}) {
  const creationDelta = formatRelative(parseISO(props.created_at), new Date(), { locale: ru });
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        minWidth: 300,
        maxWidth: 450,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? generateDarkColorHex() : generateLightColorHex(),
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                <h3>{props.name}</h3>
              </Typography>
              <Typography variant="body2" gutterBottom>
                Автор: {props.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Создан: {creationDelta}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Button size="small" variant="outlined" href={`/wishlist/${props.id}`}>Посмотреть список</Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <ActionButtons props={{ username: props.username, id: props.id}}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
