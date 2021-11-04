import {Button, Card} from "react-bootstrap";
import React from "react";

const {REACT_APP_API_V2_URL} = process.env;

function DetailProductCard(props) {

    const url = props.product.url;
    const name = props.product.name;
    const id = props.product.id;
    const created_at = props.product.created_at;
    const updated_at = props.product.updated_at;
    const substitutable = props.product.substitutable;
    const reserved = props.product.reserved;
    const card_bg = (reserved) ? "secondary": "success";

    const reserve_product = () => {
        const ReverseEndpoint = REACT_APP_API_V2_URL + '/wishlist-products/' + id  + '/reserve';

        const request = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
        };

        fetch(ReverseEndpoint, request)
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

        window.location.reload();

    }

    const ReserveBtn = () => {
        if (reserved)
        {
            return (
            <>
               <Button variant="secondary">Reserve</Button>
            </>)
        }
        else
        {
            return (
            <>
                <Button variant="primary" onClick={reserve_product}>Reserve</Button>
             </>
       )
       }
    }

    return (
        <>
            <Card key={id} bg={card_bg}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        Created at: {created_at}
                        <br/>
                        Updated at: {updated_at}
                        <br/>
                        Substitutable: {substitutable}
                        <br/>
                        Reserved: {reserved}
                    </Card.Text>
                    <Card.Link href={url}>Посмотреть товар</Card.Link>
                    <br/>
                    <hr/>
                    <ReserveBtn/>
                </Card.Body>
            </Card>
        </>
    )
}

export default DetailProductCard