import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import { formatRelative, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { AuthContext } from '../../GlobalContext';
import { generateDarkColorHex, generateLightColorHex } from '../../Utils';


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

// TODO: @devalv remove product
// TODO: @devalv edit product

export default function ProductItem({props}) {
  const productInfo = props.product;
  const {username} = props;
  const creationDelta = formatRelative(parseISO(productInfo.created_at), new Date(), { locale: ru });
  let updateDelta = "никогда";
  if (productInfo.updated_at !== null){
    updateDelta = formatRelative(parseISO(productInfo.updated_at), new Date(), { locale: ru });
  }
  const reservedLabel = productInfo.reserved ? "Зарезервирован": "Зарезервировать";
  const [checkboxState, setCheckboxState] = React.useState({
    reserved: productInfo.reserved
  });

  const handleReserve = async (event) => {
    setCheckboxState({
      ...checkboxState,
      [event.target.name]: event.target.checked,
    });
    const { REACT_APP_API_V2_URL } = process.env;
    const reserveEndpoint = `${REACT_APP_API_V2_URL}/wishlist-products/${productInfo.id}/reserve`;
    await axios.patch(reserveEndpoint);
  };

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
              <Typography variant="body1" color="text.secondary">
                Создан: {creationDelta}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Отредактирован: {updateDelta}
              </Typography>
              <Tooltip title="Если стоит галочка, значит кто-то уже занял товар.">
                <Typography ml={-2}  color="text.secondary">
                   <FormControlLabel name="reserved" onChange={handleReserve} sx={{ gap: 0, mt: -1 }} labelPlacement="start" disabled={checkboxState.reserved} control={<Checkbox />} checked={checkboxState.reserved} label={reservedLabel} />
                </Typography>
              </Tooltip>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <Button size="small" variant="outlined" href={productInfo.url}>Посмотреть товар</Button>
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
