import React, { useEffect, useContext } from "react";
import {Container, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import {Github, Person, PersonFill, PersonX} from "react-bootstrap-icons";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import AuthContext from "./authContext";

const {REACT_APP_API_URL} = process.env;
const LoginRedirectEndpoint = REACT_APP_API_URL + '/react_login/'
const LogoutEndpoint = REACT_APP_API_URL + '/logout/'
const UserInfoEndpoint = REACT_APP_API_URL + '/user/info/'


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


function Authentication() {

    const [authState, setauthState] = useContext(AuthContext);

    const checkUserSessionStatus = (accessToken) => {
        const request = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            credentials: "include",
        };

        fetch(UserInfoEndpoint, request)
            .then((response) => {
                if (!response.ok) throw new Error(response.data);
                else return response.json();
            })
            .then((data) => {
                // handleLogin()
                setauthState({username: data["username"], authenticated: true, token: accessToken})

            })
            .catch((err) => {
                console.log(err);
            });
    };

    const login = () => {
        let client_state = Math.random().toString(36).substring(2, 30);
        window.location.href = LoginRedirectEndpoint + "?state=" + client_state;
    };

    const logout = () => {
        let request = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + getCookie("access_token"),
            },
            credentials: "include",
        };

        fetch(LogoutEndpoint, request)
            .then((response) => {
                if (!response.ok) throw new Error(response.data);
                else {
                    setauthState({username: "", authenticated: false, token: ""})
                    setCookie("access_token", null);
                    window.location.reload();
                }
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
            // console.log('effect access token:', accessToken)
            // Check token is valid
            checkUserSessionStatus(accessToken);
            // TODO: do not set cookie if toke in not valid
            setCookie("access_token", accessToken);
        } else {
            // There is no token info. Don`t do anything
            console.log("Can`t find token anywhere.");
        }
    };

    //
    useEffect(() => {
        // console.log("calling auth useEffect");

        authenticate();

    }, [])
    // console.log('authenticated in auth.js:', authState.authenticated)

    let nav_profile;

    if (authState.authenticated) {
        nav_profile = (
            <>
                <NavDropdown.Item>
                    <PersonFill/>
                    &nbsp;{authState.username}
                </NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={logout}>
                    <PersonX/>
                    &nbsp;Log out
                </NavDropdown.Item>
            </>
        );
    } else {
        nav_profile = (
            <>
                <NavDropdown.Item onClick={login}>
                    <Person/>
                    &nbsp;Log in
                </NavDropdown.Item>
            </>
        );
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavbarBrand href="#home">
                        Yet another wishlist maker v.0.1
                    </NavbarBrand>
                    <NavbarToggle/>
                    <NavbarCollapse className="justify-content-end">
                        <NavDropdown title="Profile" id="ProfileNav">
                            {nav_profile}
                        </NavDropdown>
                        <Nav.Link href="https://github.com/devalv/yawm-frontend">
                            <Github/>
                        </Nav.Link>
                    </NavbarCollapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Authentication;