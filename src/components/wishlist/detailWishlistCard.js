import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function DetailWishlistCard() {
    // TODO: @devalv use env
    const { id } = useParams();
    const wishlistDetailEndpoint = "http://localhost:8000/v2/wishlists/" + id;
    const [wishlistDetail, setWishlistDetail] = useState({"name": "", "created_at": "", "products": []});

    // TODO: @devalv productCard component

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
                })
                .catch((err) => {
                });
        };

        getWishlistInfo();

    }, [wishlistDetailEndpoint])


    return (
        <>
            <h3>Wishlist `{wishlistDetail.name}` was created at: `{wishlistDetail.created_at}` and consists of `{wishlistDetail.products.length}` products.</h3>
        </>
    )

}

export default DetailWishlistCard;