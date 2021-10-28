import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

function AddWishlist(props) {

    // TODO: @devalv move to env
    const wishlistsEndpointV2 = "http://localhost:8000/v2/wishlists/";

    const [productInputs, setProductInputs] = useState([])
    // TODO: @devalv оставить только formYValues?
    const [formYValues, setFormYValues] = useState([{url: ""}])

    const handleYChange = (i, e) => {
        const newFormValues = formYValues;
        newFormValues[i][e.target.name] = e.target.value;
        setFormYValues(newFormValues);
      }

    const addProductLine = (index) => {
        setProductInputs([...productInputs, productLine(index)]);
    }

    const addFormFields = () => {
        // setFormValues(formYValues => [...formYValues, new_element]);
        setFormYValues([...formYValues, { url: "" }]);
        addProductLine(productInputs.length);
      }

    const removeFormFields = (i) => {
        let newFormValues = [...formYValues];
        newFormValues.splice(i, 1);
        setFormYValues(newFormValues)
    }


    const modalClose = () => {
        setProductInputs([]);
        setFormYValues([]);
        props.handleClose();
    }

    const createWishlist = (e) => {
        e.preventDefault(); // prevent the default action

        const request = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + props.token},
            body: JSON.stringify({product_urls: formYValues}),
            credentials: "include",
        };

        fetch(wishlistsEndpointV2, request)
            .then((response) => {
                if (!response.ok) throw new Error(response.data);
                else return response.json();
            })
            .then((data) => {
                console.log("Sent!");
                props.handleClose();
                window.location.reload();
            })
            .catch((err) => {
                console.log('err:', err)
            });
    };

    const productLine = (index) => {
        return (
            <>
                <Form.Group className="full-width">
                    <Form.Control
                        type="text"
                        placeholder="https://ya.ru"
                        name="url"
                        onChange={e => handleYChange(index, e)}
                    />
                    <Form.Text className="text-muted">
                        Product url must be a unique value.
                    </Form.Text>
                </Form.Group>
            </>
        )
    }



    const tierInputs = productInputs.map((tier, i) => (
        <Form.Row key={i}>
            {tier}
        </Form.Row>
        ))

    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>Insert product urls:</Modal.Title>
                <Button variant="secondary" onClick={modalClose}>
                    Cancel
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={createWishlist}>
                    {tierInputs}

                    <hr />
                    <Button className="addMoreBtn" onClick={addFormFields}>
                        +Add Product
                    </Button>
                    <hr />
                    <Button variant="primary" type="submit">
                        Next
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddWishlist;
