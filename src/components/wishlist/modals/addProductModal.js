import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";

const {REACT_APP_API_V2_URL} = process.env;

function AddWishlistProductModal(props) {
    const id = props.id;
    const token = props.token;

    const wishlistsAddProductEndpoint = REACT_APP_API_V2_URL + "/wishlists/" + id + "/products-add";
    const [productUrls, setProductUrls] = useState([])

    const handleProductUrlsChange = (i, e) => {
        setProductUrls([{"url": e.target.value}]);
    }

    const addWishlistProducts = (e) => {
        e.preventDefault(); // prevent the default action

        const request = {
            method: "PUT",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
            body: JSON.stringify({"product_urls": productUrls}),
            credentials: "include",
        };

        fetch(wishlistsAddProductEndpoint, request)
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавление позиции в вишлист
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Вставьте ссылку на товар</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="https://ya.ru" onChange={e => handleProductUrlsChange(0, e)}/>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addWishlistProducts}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddWishlistProductModal;
