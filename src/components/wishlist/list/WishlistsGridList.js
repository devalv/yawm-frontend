import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useParams } from "react-router-dom";

import WishlistItem from "./WishlistGridItem";


export default function NestedWishlistsGrid() {
  const { REACT_APP_API_V1_URL } = process.env;
  const { page } = useParams();

  const [wishlists, setWishlist] = React.useState([]);
  const [paginationInfo, setPaginationInfo] = React.useState({
    next: null,
    prev: null,
  });

  const extractPaginationPages = (paginationLinks) => {
    setPaginationInfo({
      next: null,
      prev: null,
      show_prev: null,
      show_next: null,
    });
    const IsShowPrev = paginationLinks.first !== paginationLinks.self;
    const IsShowNext = paginationLinks.last !== paginationLinks.self;
    const PrevLink = paginationLinks.prev
      ? paginationLinks.prev.match(/(?:page=)(\d)/)[1]
      : null;
    const NextLink = paginationLinks.next
      ? paginationLinks.next.match(/(?:page=)(\d)/)[1]
      : null;
    setPaginationInfo({
      next: NextLink,
      prev: PrevLink,
      IsShowPrev,
      IsShowNext,
    });
  };

  React.useEffect(() => {
    const getWishlists = async () => {
      const producerWishlistEndpoint = page
        ? `${REACT_APP_API_V1_URL}/wishlist?size=11&page=${page}`
        : `${REACT_APP_API_V1_URL}/wishlist?size=11`;

      await axios.get(producerWishlistEndpoint).then((response) => {
        setWishlist(response.data.items);
        extractPaginationPages(response.data.links);
        // TODO: @devalv show pagination buttons
        console.debug(paginationInfo);
      });
    };

    getWishlists();
  }, [page]);

  return (
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
  );
}
