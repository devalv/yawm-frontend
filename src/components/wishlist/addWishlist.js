import {Button, Form, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";

const {REACT_APP_API_V2_URL} = process.env;

function AddWishlist(props) {

    // TODO: @devalv move to env
    const wishlistsEndpointV2 = REACT_APP_API_V2_URL + "/wishlists/";

    const [productInputs, setProductInputs] = useState([])
    // TODO: @devalv оставить только formYValues?
    const [formYValues, setFormYValues] = useState([])

    const handleYChange = (i, e) => {
        setFormYValues([...formYValues, {"url": e.target.value}]);
      }

    const addProductLine = () => {
        setProductInputs([...productInputs, productLine(formYValues.length)]);
        setFormYValues([...formYValues, {}]);
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

    const validateForm = () => {
        const validUrls = []
        formYValues.forEach((row) => {
            let url = row.url;

            if (url) {
               validUrls.push({"url": url});
            }
        });
        setFormYValues(validUrls)
    }

    const createWishlist = (e) => {
        e.preventDefault(); // prevent the default action

        validateForm()

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

    useEffect(() => {
        addProductLine();
    }, [])

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
