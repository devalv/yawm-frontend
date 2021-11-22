import {Button, Card} from "react-bootstrap";
import React from "react";
import EditWishlistProductModal from "./modals/editProductModal";
import axios from "axios";

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

    const reserveProduct = async () => {
        const productReserveEndpoint = REACT_APP_API_V2_URL + '/wishlist-products/' + id  + '/reserve';
        try {
            await axios.put(productReserveEndpoint)
            .then(function (response) {
                window.location.reload();
            })
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const deleteProduct = async () => {
        const productDeleteEndpoint = REACT_APP_API_V2_URL + '/wishlist-products/' + id;
        try {
            await axios.delete(productDeleteEndpoint)
            .then(function (response) {
                window.location.reload();
            })
        }
        catch (err) {
            console.error(err.message);
        }
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