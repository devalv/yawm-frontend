// // import { Button, Form, Modal, Spinner } from "react-bootstrap";
// import React, { useState } from "react";
// import axios from "axios";
//
// const { REACT_APP_API_V2_URL } = process.env;
//
// function AddWishlist(props) {
//   const wishlistsEndpointV2 = `${REACT_APP_API_V2_URL}/wishlists`;
//   const [productInputs, setProductInputs] = useState([]);
//   const [formValues, setFormValues] = useState([]);
//   const [loading, setLoading] = useState(false);
//
//   // const handleFormInputChange = (i, e) => {
//   //   const url = e.target.value.replaceAll("#", "");
//   //   setFormValues([...formValues, { url: url }]);
//   // };
//   //
//   // const addProductLine = () => {
//   //   setProductInputs([...productInputs, productLine(formValues.length)]);
//   //   setFormValues([...formValues, {}]);
//   // };
//   //
//   // const modalClose = () => {
//   //   setProductInputs([]);
//   //   setFormValues([]);
//   //   props.handleClose();
//   //   setLoading(false);
//   // };
//   //
//   // const toggleLoader = () => {
//   //   if (!loading) {
//   //     setLoading(true);
//   //   } else {
//   //     setLoading(false);
//   //   }
//   // };
//   //
//   // const createWishlist = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await axios
//   //       .post(wishlistsEndpointV2, { product_urls: formValues })
//   //       .then(function (response) {
//   //         props.handleClose();
//   //         window.location.reload();
//   //       });
//   //   } catch (err) {
//   //     console.error(err.message);
//   //   }
//   // };
//   //
//   // const productLine = (index) => {
//   //   return (
//   //     <>
//   //       <Form.Group className="full-width">
//   //         <Form.Control
//   //           type="text"
//   //           placeholder="https://ya.ru"
//   //           onChange={(e) => handleFormInputChange(index, e)}
//   //         />
//   //         <Form.Text className="text-muted">
//   //           В строке должен быть только 1 товар
//   //         </Form.Text>
//   //       </Form.Group>
//   //     </>
//   //   );
//   // };
//   //
//   // const tierInputs = productInputs.map((tier, i) => (
//   //   <Form.Row key={i}>{tier}</Form.Row>
//   // ));
//
//   return
//   // (
//   //   <Modal show={props.show} onHide={props.handleClose} onShow={addProductLine}>
//   //     <Modal.Header>
//   //       <Modal.Title>Вставьте ссылки на карточки товара:</Modal.Title>
//   //       <Button variant="secondary" onClick={modalClose}>
//   //         Закрыть
//   //       </Button>
//   //     </Modal.Header>
//   //     <Modal.Body>
//   //       <Form onSubmit={createWishlist}>
//   //         {tierInputs}
//   //         <hr />
//   //         <Button className="addMoreBtn" onClick={addProductLine}>
//   //           Добавить
//   //         </Button>
//   //         <hr />
//   //         <Button
//   //           variant="success"
//   //           type="submit"
//   //           onClick={() => toggleLoader()}
//   //         >
//   //           {loading ? (
//   //             <Spinner
//   //               as="span"
//   //               animation="border"
//   //               size="sm"
//   //               role="status"
//   //               aria-hidden="true"
//   //             />
//   //           ) : (
//   //             ""
//   //           )}
//   //           Создать
//   //         </Button>
//   //       </Form>
//   //     </Modal.Body>
//   //   </Modal>
//   // );
// }
//
// export default AddWishlist;