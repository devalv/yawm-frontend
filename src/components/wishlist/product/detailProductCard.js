import {Button, Card} from "react-bootstrap";
import React from "react";
import EditWishlistProductModal from "./modals/editProductModal";

const {REACT_APP_API_V2_URL} = process.env;

function DetailProductCard(props) {
    const owner = props.owner;
    const url = props.product.url;
    const name = props.product.name;
    const id = props.product.id;
    // TODO: @devalv proper dates is here!
    const createdAt = (props.product.created_at) ? new Date(props.product.created_at): null;
    const createdAtStr = createdAt.toLocaleString("ru")

    console.log(createdAt)

    const substitutable = props.product.substitutable;
    const reserved = props.product.reserved;
    const card_bg = (reserved) ? "secondary": "";

    const [modalEditProductShow, setModalEditProductShow] = React.useState(false);

    const reserveProduct = () => {
        const productReserveEndpoint = REACT_APP_API_V2_URL + '/wishlist-products/' + id  + '/reserve';
        const request = {
            method: "PUT",
            credentials: "include",
        };
        fetch(productReserveEndpoint, request)
            .then((response) => {
                if (!response.ok) throw new Error(response.data);
                else return response.json();
            })
            .then((data) => {
                props.handleClose();
                window.location.reload();
            })
            .catch((err) => {
                console.log('err:', err)
            });
        window.location.reload();
    }

    const deleteProduct = () => {
        const productDeleteEndpoint = REACT_APP_API_V2_URL + '/wishlist-products/' + id;
        const request = {
            method: "DELETE",
            credentials: "include",
        };
        fetch(productDeleteEndpoint, request)
                .then((response) => {
                    if (!response.ok) throw new Error(response.data);
                    else window.location.reload()
                })
                .catch((err) => {
                    console.log('err:', err)
        });
    }

    const ReserveBtn = () => {
        if (!reserved && !owner)
        {
            return (
            <>
                <Button variant="primary" onClick={reserveProduct}>Забронировать</Button>
            </>
       )
       }
        else if (owner)
        {
           return (
            <>
                <Button variant="warning" onClick={() => setModalEditProductShow(true)}>Редактировать</Button>
                <Button variant="danger" onClick={deleteProduct}>Удалить</Button>
                <EditWishlistProductModal
                    id={id}
                    substitutable={substitutable}
                    reserved={reserved}
                    show={modalEditProductShow}
                    onHide={() => setModalEditProductShow(false)}
                />
            </>
           )
        }
        else {
            return (<></>)
        }
    }

    return (
        <>
            <Card key={id} bg={card_bg}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        Создан: {createdAtStr}
                        <br/>
                        Заменяем: {(substitutable)? "да": "нет"}
                        <br/>
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