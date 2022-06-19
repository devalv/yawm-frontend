import * as React from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { formatRelative, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import Box from '@mui/material/Box';
import { AuthContext } from '../../GlobalContext';
import NestedProductGridList from './ProductGridList';
import ProductAddFormDialog from '../dialog/ProductAdd';
import WishlistEditFab from '../dialog/FabButtons';
import WishlistEditFormDialog from '../dialog/WishlistEdit';


export default function WishlistDetailCard() {
  const { REACT_APP_API_V2_URL } = process.env;
  const { AuthState } = React.useContext(AuthContext);
  const { id } = useParams();

  // Dialogs
  const [openAddProduct, setAddProduct] = React.useState(false);
  const [openEditWishlistName, setEditWishlistName] = React.useState(false);
  const handleClickOpenAddProduct = () => {
    setAddProduct(true);
  };
  const handleClickOpenEditWishlist = () => {
    setEditWishlistName(true);
  };

  // Products
  const [products, setProducts] = React.useState([]);
  const [wishlistInfo, setWishlistInfo] = React.useState({name: "", created_at: null, user_id: "", username: "", updated_at: null});
  // Wishlist info
  let creationDelta = "никогда";
  if (wishlistInfo.created_at !== null){
    creationDelta = formatRelative(parseISO(wishlistInfo.created_at), new Date(), { locale: ru });
  }

  React.useEffect(() => {
    const getProducts = async () => {
      const producerWishlistEndpoint = `${REACT_APP_API_V2_URL}/wishlists/${id}`;
      await axios.get(producerWishlistEndpoint).then((response) => {
        setProducts(response.data.products);
        delete response.data.products;
        setWishlistInfo(response.data);
      });
    };
    getProducts();
  }, [id, AuthState]);

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }} mt={-2}>
        <Typography gutterBottom variant="h4" align="center">
          Список: &quot;{wishlistInfo.name}&quot; за авторством &quot;{wishlistInfo.username}&quot; от {creationDelta}
        </Typography>
      </Box>
      <NestedProductGridList props={{ "products": products, "username": wishlistInfo.username }}/>
      <WishlistEditFab props={{showAddProduct: handleClickOpenAddProduct, showEditWishlistName: handleClickOpenEditWishlist}}/>
      <ProductAddFormDialog props={{open: openAddProduct, handler: setAddProduct}}/>
      <WishlistEditFormDialog props={{open: openEditWishlistName, handler: setEditWishlistName}}/>
    </Container>
  );
}