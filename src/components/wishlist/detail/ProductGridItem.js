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


// TODO: @devalv явно нужно вынести в отдельный файл с утилитами
function generateDarkColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i += 1)
    color += (`0${  Math.floor(Math.random() * 16**2 / 2).toString(16)}`).slice(-2);
  return color;
}

// TODO: @devalv явно нужно вынести в отдельный файл с утилитами
function generateLightColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i += 1)
    color += (`0${  Math.floor(((1 + Math.random()) * 16**2) / 2).toString(16)}`).slice(-2);
  return color;
}

function ActionButtons({props}) {
  const { AuthState } = React.useContext(AuthContext);
  const handleDelete = async () => {
    const { REACT_APP_API_V2_URL } = process.env;
    const deleteEndpoint = `${REACT_APP_API_V2_URL}/wishlist-products/${props.id}`;
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

// TODO: @devalv зарезервировать
// TODO: @devalv отредактировать
// TODO: @devalv показывать что товар уже зарезервирован

export default function ProductItem({props}) {
  const productInfo = props.product;
  const {username} = props;
  const creationDelta = formatRelative(parseISO(productInfo.created_at), new Date(), { locale: ru });
  let updateDelta = "никогда";
  if (productInfo.updated_at !== null){
    updateDelta = formatRelative(parseISO(productInfo.updated_at), new Date(), { locale: ru });
  }
  const reserved = productInfo.reserved ? "Да": "Нет";
  const substitutable = productInfo.substitutable ? "Да": "Нет";

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
                <h3>{productInfo.name}</h3>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Создан: {creationDelta}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Отредактирован: {updateDelta}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Зарезервирован: {reserved}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Заменяем: {substitutable}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Button size="small" href={productInfo.url}>Посмотреть</Button>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <ActionButtons props={{ username, id: productInfo.id}}/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
