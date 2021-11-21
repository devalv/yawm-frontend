import {Button, FormCheck, FormGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";

const {REACT_APP_API_V2_URL} = process.env;

function EditWishlistProductModal(props) {
    const id = props.id;

    const productEditEndpoint = REACT_APP_API_V2_URL + "/wishlist-products/" + id;
    const [substitutable, setProductSubstitutable] = useState(props.substitutable)
    const [reserved, setProductReserved] = useState(props.reserved)

    const updateProduct = (e) => {
        const productInfo = {"reserved": reserved, "substitutable": substitutable}
        e.preventDefault(); // prevent the default action

        const request = {
            method: "PUT",
            body: JSON.stringify(productInfo),
            credentials: "include",
        };

        fetch(productEditEndpoint, request)
            .then((response) => {
                if (!response.ok) throw new Error(response.data);
                else return response.json();
            })
            .then((data) => {
                props.onHide();
                window.location.reload();
            })
            .catch((err) => {
                console.log('err:', err)
            });

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
            <FormCheck type="switch" label="Резервирован" id="reserved-switch" checked={reserved} onChange={() => setProductReserved((!reserved))}/>
            <FormCheck type="switch" label="Заменяем" id="substitutable-switch" checked={substitutable} onChange={() => setProductSubstitutable((!substitutable))}/>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={updateProduct}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditWishlistProductModal;