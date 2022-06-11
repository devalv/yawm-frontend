import * as React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductItem from './ProductGridItem';

// TODO: @devalv remove product
// TODO: @devalv edit product
// TODO: @devalv reserve product


export default function NestedProductGridList({props}) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={{ xs: 2, md: 4, lg: 6 }} columns={{ xs: 4, sm: 8, md: 12, lg: 20}}>
          {props.products.map((product) => (
            <Grid item key={product.id}>
              <ProductItem props={{"product": product, "username": props.username}}/>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}