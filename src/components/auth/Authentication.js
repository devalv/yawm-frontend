import React, { useEffect, useContext } from "react";
import {AuthContext} from "./authContext";

const {REACT_APP_API_URL} = process.env;
const UserInfoEndpoint = REACT_APP_API_URL + '/user/info'

function Authentication(props) {
    const [, setAuthState] = useContext(AuthContext);
    const checkUserTokenStatus = (accessToken) => {
        const request = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            credentials: "include",
        };

        fetch(UserInfoEndpoint, request)
            .then((response) => {
                if (!response.ok) {
                    props.logoutUser();
                }
                else return response.json();
            })
            .then((data) => {
                setAuthState({username: data["username"], authenticated: true, token: accessToken, user_id: data["id"]});
                localStorage.setItem("access_token", accessToken);
            });
    };

    const authenticate = () => {
        // Try to find a token from url or on a client storage
        const urlToken = (window.location.search.match(/authToken=([^&]+)/) || [])[1];

        if (urlToken) {
            console.log('Token in a URL')
            window.history.pushState("object", document.title, "/");
            props.logoutUser();
        }

        const storageToken = localStorage.getItem("access_token");

        if (!urlToken && !storageToken) {
            console.log('There is no tokens at all!')
            props.logoutUser();
        }
        else if (urlToken) {
            console.log('About to set a new user session.')
            checkUserTokenStatus(urlToken);
        }
        else if (storageToken) {
            console.log('About to check a client token on a backend.')
            checkUserTokenStatus(storageToken);
        }
    };

    useEffect(() => {
        authenticate();
    }, [])

    return (
        <>
        </>
    );
}

export default Authentication;