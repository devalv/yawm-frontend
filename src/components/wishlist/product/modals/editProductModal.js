import { Button, FormCheck, FormGroup, Modal } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

const { REACT_APP_API_V2_URL } = process.env;

function EditWishlistProductModal(props) {
  const id = props.id;

  const productEditEndpoint = `${REACT_APP_API_V2_URL}/wishlist-products/${id}`;
  const [substitutable, setProductSubstitutable] = useState(
    props.substitutable
  );
  const [reserved, setProductReserved] = useState(props.reserved);

  const updateProduct = async (e) => {
    const productInfo = { reserved: reserved, substitutable: substitutable };
    e.preventDefault(); // prevent the default action
    try {
      await axios
        .put(productEditEndpoint, productInfo)
        .then(function (response) {
          props.onHide();
          window.location.reload();
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton closeLabel="Закрыть">
        <Modal.Title id="contained-modal-title-vcenter">
          Редактирование позиции
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup size="sm" className="mb-3">
          <FormCheck
            type="switch"
            label="Резервирован"
            id="reserved-switch"
            checked={reserved}
            onChange={() => setProductReserved(!reserved)}
          />
          <FormCheck
            type="switch"
            label="Заменяем"
            id="substitutable-switch"
            checked={substitutable}
            onChange={() => setProductSubstitutable(!substitutable)}
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={updateProduct}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditWishlistProductModal;
