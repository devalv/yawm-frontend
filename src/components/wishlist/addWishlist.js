import {Button, Form, Modal, Spinner} from "react-bootstrap";
import React, {useEffect, useState} from "react";

const {REACT_APP_API_V2_URL} = process.env;

function AddWishlist(props) {

    // TODO: @devalv move to env
    const wishlistsEndpointV2 = REACT_APP_API_V2_URL + "/wishlists/";

    const [productInputs, setProductInputs] = useState([])
    // TODO: @devalv оставить только formYValues?
    const [formYValues, setFormYValues] = useState([])
    const [loading, setLoading] = useState(false)

    const handleYChange = (i, e) => {
        setFormYValues([...formYValues, {"url": e.target.value}]);
      }

    const addProductLine = () => {
        setProductInputs([...productInputs, productLine(formYValues.length)]);
        setFormYValues([...formYValues, {}]);
    }

    const modalClose = () => {
        setProductInputs([]);
        setFormYValues([]);
        props.handleClose();
        setLoading(false);
    }

    const validateForm = () => {
        const validUrls = []
        formYValues.forEach((row) => {
            let url = row.url;
            if (url) {
                url = url.replaceAll("#", "");
                validUrls.push({"url": url});
            }
        });
        return validUrls
    }


    const toggleLoader = () => {
    if (!loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  };

    const createWishlist = (e) => {
        e.preventDefault(); // prevent the default action

        const validatedUrls = validateForm()

        const request = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + props.token},
            body: JSON.stringify({product_urls: validatedUrls}),
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
                        В строке должен быть только 1 товар
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
                <Modal.Title>Вставьте ссылки на карточки товара:</Modal.Title>
                <Button variant="secondary" onClick={modalClose}>
                    Закрыть
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={createWishlist}>
                    {tierInputs}
                    <hr />
                    <Button className="addMoreBtn" onClick={addProductLine}>
                        Добавить
                    </Button>
                    <hr />
                    <Button variant="success" type="submit" onClick={() => toggleLoader()}>
                        {loading ? <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        /> : ""}
                        Создать
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AddWishlist;
