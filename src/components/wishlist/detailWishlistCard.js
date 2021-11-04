import {useParams, useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import DetailProductCard from "./product/detailProductCard";
import {Button, CardGroup, Container, Row} from "react-bootstrap";


const {REACT_APP_API_V2_URL, REACT_APP_API_URL} = process.env;

function DetailWishlistCard(props) {
    const { id } = useParams();
    const history = useHistory();
    const userId = props.userId;
    const token = props.token;

    const wishlistDetailEndpoint = REACT_APP_API_V2_URL + "/wishlists/" + id;
    const wishlistDeleteEndpoint = REACT_APP_API_URL + "/wishlist/" + id;

    console.log('Delete endpoint:', wishlistDeleteEndpoint);

    const [wishlistDetail, setWishlistDetail] = useState({"name": "", "created_at": "", "user_id": "", "products": []});
    const [productCards, setProductCards] = useState([]);

    const setProducts = (products) => {
        const productComponents = [];
        products.forEach((product) => {
            productComponents.push(<DetailProductCard product={product} key={product.id} userId={userId}/>);
        });
        setProductCards(productComponents);
    }

    useEffect(() => {
        const getWishlistInfo = () => {
            const request = {
                method: "GET",
                credentials: "include",
            };

            fetch(wishlistDetailEndpoint, request)
                .then((response) => {
                    if (!response.ok) throw new Error(response.data);
                    else return response.json();
                })
                .then((data) => {
                    setWishlistDetail(data);
                    setProducts(data.products);
                })
                .catch((err) => {
                });
        };

        getWishlistInfo();
    }, [])

    const deleteWishlist = () => {
        const request = {
            method: "DELETE",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token},
            credentials: "include",
        };
        fetch(wishlistDeleteEndpoint, request)
                .then((response) => {
                    if (!response.ok) throw new Error(response.data);
                    else history.push("/");
                })
                .catch((err) => {
                    console.log('err:', err)
        });
    }

    function WishlistDetails() {

        if (wishlistDetail.user_id === userId)
        {
            return (
            <>
                <h1>Ваш вишлист `{wishlistDetail.name}` был создан: `{wishlistDetail.created_at}` и состоит из
                    `{wishlistDetail.products.length}` продуктов.</h1>
                <Button variant="danger" onClick={deleteWishlist}>Удалить</Button>
            </>
            )
       }
        else {
            return (
            <>
                <h1>Вишлист `{wishlistDetail.name}` был создан `{wishlistDetail.username}`: `{wishlistDetail.created_at}` и состоит из
                    `{wishlistDetail.products.length}` продуктов.</h1>
            </>
            )
        }
    }


    return (
        <>
            <Container>
                <WishlistDetails />
            </Container>
            <hr />
            <Container>
                <CardGroup>
                    <Row xs={1} md={3} xxl={4} className="g-4">
                        {productCards}
                    </Row>
                </CardGroup>
            </Container>

        </>
    )

}

export default DetailWishlistCard;