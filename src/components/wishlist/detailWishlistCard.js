import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { Button, CardGroup, Col, Container, Row } from "react-bootstrap";

import DetailProductCard from "./product/detailProductCard";
import EditWishlistModal from "./modals/editWishlistModal";
import AddWishlistProductModal from "./modals/addProductModal";
import axios from "axios";

const { REACT_APP_API_V2_URL, REACT_APP_API_V1_URL } = process.env;

function DetailWishlistCard(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = props.userId;

  const wishlistDetailEndpoint = `${REACT_APP_API_V2_URL}/wishlists/${id}`;
  const wishlistDeleteEndpoint = `${REACT_APP_API_V1_URL}/wishlist/${id}`;

  // const [wishlistDetail, setWishlistDetail] = useState({
  //   name: "",
  //   created_at: "",
  //   user_id: "",
  //   products: [],
  // });
  // const [products, setProducts] = useState([]);
  // const createdAt = wishlistDetail.created_at
  //   ? new Date(wishlistDetail.created_at)
  //   : null;
  // const createdAtStr = createdAt ? createdAt.toLocaleString("ru") : "";
  //
  // const [modalEditWishlistShow, setModalEditWishlistShow] =
  //   React.useState(false);
  // const handleModalEditWishlistShow = () => setModalEditWishlistShow(true);
  // const handleModalEditWishlistClose = () => setModalEditWishlistShow(false);
  // const [modalAddProductShow, setModalAddProductShow] = React.useState(false);
  // const handleModalAddProductShow = () => setModalAddProductShow(true);
  // const handleModalAddProductClose = () => setModalAddProductShow(false);
  //
  // function ProductCards() {
  //   const productsData = products;
  //   let productComponents = [];
  //   productsData.forEach((product) => {
  //     productComponents.push(
  //       <Col md="auto" className="border rounded" key={product.id}>
  //         <DetailProductCard
  //           product={product}
  //           owner={userId === wishlistDetail.user_id}
  //         />
  //       </Col>
  //     );
  //   });
  //   return <>{productComponents}</>;
  // }
  //
  // useEffect(() => {
  //   const getWishlistInfo = async () => {
  //     try {
  //       await axios.get(wishlistDetailEndpoint).then(function (response) {
  //         setWishlistDetail(response.data);
  //         setProducts(response.data.products);
  //       });
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };
  //
  //   getWishlistInfo();
  // }, [wishlistDetailEndpoint]);
  //
  // const deleteWishlist = async () => {
  //   try {
  //     await axios.delete(wishlistDeleteEndpoint).then(function (response) {
  //       navigate("/");
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  //
  // function WishlistDetails() {
  //   if (wishlistDetail.user_id === userId) {
  //     return (
  //       <>
  //         <h1>
  //           Ваш вишлист `{wishlistDetail.name}` от {createdAtStr}.
  //         </h1>
  //         <Button variant="primary" onClick={handleModalAddProductShow}>
  //           Добавить позицию
  //         </Button>
  //         <Button variant="success" onClick={handleModalEditWishlistShow}>
  //           Сменить название
  //         </Button>
  //         <Button variant="danger" onClick={deleteWishlist}>
  //           Удалить
  //         </Button>
  //
  //         <EditWishlistModal
  //           show={modalEditWishlistShow}
  //           onHide={handleModalEditWishlistClose}
  //           name={wishlistDetail.name}
  //           id={id}
  //         />
  //
  //         <AddWishlistProductModal
  //           show={modalAddProductShow}
  //           onHide={handleModalAddProductClose}
  //           id={id}
  //         />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <h1>
  //           Вишлист `{wishlistDetail.name}` от {createdAtStr}.
  //         </h1>
  //       </>
  //     );
  //   }
  // }

  return

  // (
  //   <>
  //     <Container>
  //       <WishlistDetails />
  //     </Container>
  //     <hr />
  //     <Container>
  //       <CardGroup>
  //         <Row xs={1} md={3} xxl={4} className="g-4">
  //           <ProductCards />
  //         </Row>
  //       </CardGroup>
  //     </Container>
  //   </>
  // );
}

export default DetailWishlistCard;
