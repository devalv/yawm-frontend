import React, { useState, useEffect } from 'react';
import { Card, CardGroup, Container, Modal, Row, Button } from 'react-bootstrap';

function Wishlist() {
    const { REACT_APP_API_URL} = process.env;
    const producerWishlistEndpoint = REACT_APP_API_URL + '/wishlist/';
    
    const userLoggedIn = false;
    const [wishlists, setWishlist] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    let new_wishlist_card;

    if (userLoggedIn) {
        new_wishlist_card = 
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        {/* -- */}
        <Card className="bg-success" onClick={handleShow} key="10">
        <Card.Img className="w-75 mx-auto mx-auto mt-auto mb-auto" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktYmFnLXBsdXMtZmlsbCIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC41IDMuNWEyLjUgMi41IDAgMCAwLTUgMFY0aDV2LS41em0xIDBWNEgxNXYxMGEyIDIgMCAwIDEtMiAySDNhMiAyIDAgMCAxLTItMlY0aDMuNXYtLjVhMy41IDMuNSAwIDEgMSA3IDB6TTguNSA4YS41LjUgMCAwIDAtMSAwdjEuNUg2YS41LjUgMCAwIDAgMCAxaDEuNVYxMmEuNS41IDAgMCAwIDEgMHYtMS41SDEwYS41LjUgMCAwIDAgMC0xSDguNVY4eiIvPgo8L3N2Zz4="/>
            <Card.Body>        
                <Card.Title>Add your own wishlist</Card.Title>
                <Card.Text>qwe</Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
        </Card>
        </>
    } else {
        console.log('user is logged', userLoggedIn);
        new_wishlist_card = 
        <>
        <Card className="bg-light" key="220">
        <Card.Img className="w-75 mx-auto mx-auto mt-auto mb-auto" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktYmFnLXBsdXMtZmlsbCIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMC41IDMuNWEyLjUgMi41IDAgMCAwLTUgMFY0aDV2LS41em0xIDBWNEgxNXYxMGEyIDIgMCAwIDEtMiAySDNhMiAyIDAgMCAxLTItMlY0aDMuNXYtLjVhMy41IDMuNSAwIDEgMSA3IDB6TTguNSA4YS41LjUgMCAwIDAtMSAwdjEuNUg2YS41LjUgMCAwIDAgMCAxaDEuNVYxMmEuNS41IDAgMCAwIDEgMHYtMS41SDEwYS41LjUgMCAwIDAgMC0xSDguNVY4eiIvPgo8L3N2Zz4="/>
            <Card.Body>        
                <Card.Title className="w-75 mx-auto mx-auto mt-auto mb-auto">Add your own wishlist</Card.Title>
            </Card.Body>
        </Card>
        </>
    };
    
    useEffect(() => {
        console.log('calling effect');
        const getWishlists = async () => {
            const request = {
                method: 'GET',
                credentials: 'include'
            };
        
            await fetch(producerWishlistEndpoint, request)
            .then(response => {
                if(!response.ok) throw new Error(response.data);
                else return response.json();
            })
            .then(data => {
                setWishlist(data.items);
            })
            .catch(err => {})
        };  

        getWishlists();
    }, [producerWishlistEndpoint]);

    return (
        <>
        <br></br>
        <Container>
            <CardGroup>
            <Row xs={1} md={3} xxl={4} className="g-4">
                {new_wishlist_card}
                {wishlists.map((wishlist) => 
                <Card key={wishlist.id}>
                    <Card.Img variant="top" src="data:image/png;base64,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" />
                    <Card.Body>
                        <Card.Title>{wishlist.name}</Card.Title>
                        <Card.Text>Wishlist {wishlist.id} by `{wishlist.username}` created at {wishlist.created_at}</Card.Text>
                        {/* TODO: @devalv link to a wihslist card */}
                        <Card.Link href="#">Card Link</Card.Link>
                    </Card.Body>
                </Card>
                )}
            </Row>
            </CardGroup>
        </Container>
        </>
        );
}

export default Wishlist;
