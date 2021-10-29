import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DetailProductCard from "./product/detailProductCard";
import {CardGroup, Container, Row} from "react-bootstrap";

function DetailWishlistCard() {
    // TODO: @devalv use env
    const { id } = useParams();
    const wishlistDetailEndpoint = "http://localhost:8000/v2/wishlists/" + id;
    const [wishlistDetail, setWishlistDetail] = useState({"name": "", "created_at": "", "products": []});

    // TODO: @devalv productCard component
    const [productCards, setProductCards] = useState([]);

    const setProducts = (products) => {
        const productComponents = [];
        products.forEach((product) => {
            console.log('product:', product)
            productComponents.push(<DetailProductCard product={product}/>);
        });
        setProductCards(productComponents);
    }

    useEffect(() => {
        // console.log("calling useEffect");
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

    }, [wishlistDetailEndpoint])


    return (
        <>
            <h3>Wishlist `{wishlistDetail.name}` was created at: `{wishlistDetail.created_at}` and consists of `{wishlistDetail.products.length}` products.</h3>
            {/*TODO: @devalv container*/}
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