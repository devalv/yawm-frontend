import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from '@mui/material/Container';
import axios from "axios";

import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import WishlistItem from "./WishlistGridItem";
import { AuthContext } from '../../GlobalContext';

// TODO: @devalv add wishlist

export default function NestedWishlistsGrid() {
  const { REACT_APP_API_V1_URL } = process.env;
  const { AuthState } = React.useContext(AuthContext);
  // Pagination
  const [selectedPage, setSelectedPage] = React.useState(1);
  const [pagesCount, setPagesCount] =  React.useState(1);
  const handlePageChange = (event, value) => {
    setSelectedPage(value);
  };
  // Wishlists
  const [wishlists, setWishlist] = React.useState([]);
  React.useEffect(() => {
    const getWishlists = async () => {
      const producerWishlistEndpoint = `${REACT_APP_API_V1_URL}/wishlist?size=12&page=${selectedPage}`;
      await axios.get(producerWishlistEndpoint).then((response) => {
        setWishlist(response.data.items);
        setPagesCount(Math.ceil(response.data.total / response.data.size));
      });
    };
    getWishlists();
  }, [selectedPage, AuthState]);
  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid container item spacing={{ xs: 2, md: 4, lg: 6 }} columns={{ xs: 4, sm: 8, md: 12, lg: 20}}>
            {wishlists.map((wishlist) => (
              <Grid item key={wishlist.id}>
                  <WishlistItem props={wishlist}/>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
      <br/>
      <Stack spacing={2}>
        <Pagination count={pagesCount} page={selectedPage || 1} onChange={handlePageChange} hideNextButton hidePrevButton color="primary"/>
      </Stack>
    </Container>
  );
}
