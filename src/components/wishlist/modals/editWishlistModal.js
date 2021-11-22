import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
import React, {useState} from "react";
import axios from "axios";

const {REACT_APP_API_V1_URL} = process.env;

function EditWishlistModal(props) {
    const id = props.id;
    const name = props.name;

    const wishlistsEditEndpoint = REACT_APP_API_V1_URL + "/wishlist/" + id;
    const [wishlistName, setWishlistName] = useState({"name": name})

    const handleWishlistNameChange = (e) => {
        setWishlistName({"name": e.target.value});
    }

    const updateWishlist = async (e) => {
        e.preventDefault(); // prevent the default action
        try {
            await axios.put(wishlistsEditEndpoint, wishlistName)
            .then(function (response) {
                props.onHide();
                window.location.reload();
            })
        }
        catch (err) {
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