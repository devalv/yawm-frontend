import React, { useEffect, useContext } from "react";
import AuthContext from "./authContext";

function Authentication() {
    const {REACT_APP_API_URL} = process.env;
    const UserInfoEndpoint = REACT_APP_API_URL + '/user/info/'
    const LoginRedirectEndpoint = REACT_APP_API_URL + '/react_login/'
    const LogoutEndpoint = REACT_APP_API_URL + '/logout/'
    const [authState, setauthState] = useContext(AuthContext);

    const login = () => {
        let client_state = Math.random().toString(36).substring(2, 30);
        window.location.href = LoginRedirectEndpoint + "?state=" + client_state;
    };
    const logout = () => {
        console.log('calling logout')
        let request = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("access_token"),
            },
            credentials: "include",
        };
        fetch(LogoutEndpoint, request)
        .then((response) => {
            setauthState({username: null, authenticated: false, token: null, login: login, logout: null})
            setCookie("access_token", null);
            window.location.reload();
        })
};
    const setCookie = (c_name, c_value, ex_days) => {
    let current_d = new Date();
    current_d.setTime(current_d.getTime() + ex_days * 24 * 60 * 60 * 1000);

    let expires = "expires=" + current_d.toUTCString();
    document.cookie = c_name + "=" + c_value + ";" + expires + ";path=/";
};
    const getCookie = (c_name) => {
    let name = c_name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

    const checkUserSessionStatus = (accessToken) => {
        console.log('check user sessions status')
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
                    logout();
                    throw new Error('Token is not valid');
                }
                else return response.json();
            })
            .then((data) => {
                setauthState({username: data["username"], authenticated: true, token: accessToken, login: null, logout: logout})
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const authenticate = () => {
        // Extract token from url
        let accessToken = (window.location.search.match(/authToken=([^&]+)/) ||
            [])[1];

        if (!accessToken) {
            // Extract token from cookie
            accessToken = getCookie("access_token");
        } else {
            // Clear url
            window.history.pushState("object", document.title, "/");
        }

        if (accessToken !== 'null') {
            console.log('effect access token:', accessToken)
            // Check token is valid
            checkUserSessionStatus(accessToken);
            // TODO: do not set cookie if toke in not valid
            setCookie("access_token", accessToken);
        } else {
            // There is no token info. Don`t do anything
            console.log("Can`t find token anywhere.");
            setauthState({login: login, logout: null, authenticated: false, username: null})
        }
    };

    useEffect(() => {
        console.log("calling auth useEffect");
        authenticate();

    }, [])
    // console.log('authenticated in auth.js:', authState.authenticated)

    return (
        <>
        </>
    );
}

export default Authentication;