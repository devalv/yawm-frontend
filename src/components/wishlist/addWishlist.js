import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

function AddWishlist(props) {

    console.log('props are:', props)

    // TODO: @devalv move to env
    const wishlistsEndpointV2 = "http://localhost:8000/v2/wishlists/";
    const [productInputs, setProductInputs] = useState([])

    const modalClose = () => {
        setProductInputs([]);
        props.handleClose();
    }

    const createWishlist = (e) => {
        console.log("new yoba called!");
        e.preventDefault(); // prevent the default action

        // const request = {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json", "Authorization": "Bearer " + props.token},
        //     body: JSON.stringify({product_urls: productUrls}),
        //     credentials: "include",
        // };
        //
        // await fetch(wishlistsEndpointV2, request)
        //     .then((response) => {
        //         if (!response.ok) throw new Error(response.data);
        //         else return response.json();
        //     })
        //     .then((data) => {
        //         console.log("Sent!");
        //         props.handleClose();
        //     })
        //     .catch((err) => {
        //     });
    };

    const productLine = () => {
        return (
            <>
                <Form.Group className="full-width">
                    <Form.Control
                        type="text"
                        placeholder="https://ya.ru"
                    />
                    <Form.Text className="text-muted">
                        Product url must be a unique value.
                    </Form.Text>
                </Form.Group>
            </>
        )
    }

    const addProductLine = () => {
        setProductInputs([...productInputs, productLine()]);
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
                    <Button className="addMoreBtn" onClick={addProductLine}>
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
