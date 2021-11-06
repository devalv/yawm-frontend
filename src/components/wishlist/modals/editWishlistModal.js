import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";

const {REACT_APP_API_URL} = process.env;

function EditWishlistModal(props) {
    const id = props.id;
    const name = props.name;
    const token = props.token;

    const wishlistsEditEndpoint = REACT_APP_API_URL + "/wishlist/" + id;
    const [wishlistName, setWishlistName] = useState({"name": name})

    const handleWishlistNameChange = (e) => {
        setWishlistName({"name": e.target.value});
    }

    const updateWishlist = (e) => {
        e.preventDefault(); // prevent the default action

        const request = {
            method: "PUT",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
            body: JSON.stringify(wishlistName),
            credentials: "include",
        };

        fetch(wishlistsEditEndpoint, request)
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
          Редактирование вашего вишлиста `{name}`
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Введите название</InputGroup.Text>
            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder={wishlistName.name} onChange={e => handleWishlistNameChange(e)}/>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={updateWishlist}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditWishlistModal;