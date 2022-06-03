import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { formatRelative, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';


function generateDarkColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i += 1)
    color += (`0${  Math.floor(Math.random() * 16**2 / 2).toString(16)}`).slice(-2);
  return color;
}

function generateLightColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i += 1)
    color += (`0${  Math.floor(((1 + Math.random()) * 16**2) / 2).toString(16)}`).slice(-2);
  return color;
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
                <Button size="small" href={`/wishlist/${props.id}`}>Посмотреть</Button>
              </Typography>
            </Grid>
          </Grid>
          {/* TODO: кнопка удалить для автора */}
          {/* <Grid item> */}
          {/*  <Typography variant="subtitle1" component="div"> */}
          {/*    $19.00 */}
          {/*  </Typography> */}
          {/* </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  );
}
