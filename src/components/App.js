import React, {useState} from "react";
import { AuthContext, anonymousUser } from "./auth/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Authentication from "./auth/Authentication";
import Wishlist  from "./wishlist/List";
import DetailWishlistCard from "./wishlist/detailWishlistCard";
import NavbarC from "./Navbar";
import {useHealthCheck} from "@webscopeio/react-health-check";
import {Modal} from "react-bootstrap";

const {REACT_APP_API_URL, REACT_APP_HEALTH_URL} = process.env;

function App() {

    const [AuthState, setAuthState] = useState(anonymousUser);

    const logout = () => {
        setAuthState(anonymousUser);
        localStorage.setItem("access_token", '');
    }

    const login = () => {
        // TODO: @devalv check that client state changes
        const LoginRedirectEndpoint = REACT_APP_API_URL + '/react_login'
        let client_state = Math.random().toString(36).substring(2, 30);
        window.location.href = LoginRedirectEndpoint + "?state=" + client_state;
    };

    const backendLogout = () => {
        const LogoutEndpoint = REACT_APP_API_URL + '/logout'
        // TODO: @devalv как экспортировать функцию и когда ее использовать?
        logout()
        // send request to a backend
        let request = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + AuthState.token,
            },
            credentials: "include",
        };

        fetch(LogoutEndpoint, request);
        window.location.reload();
    }

    const { available } = useHealthCheck({
        service: {
            name: 'auth',
            url: REACT_APP_HEALTH_URL,
        },
        onSuccess: ({ service, timestamp }) => {
            console.log(`Service "${service.name}" is available since "${timestamp}" 🎉`);
        },
        onError: ({ service, timestamp }) => {
            console.log(`Service "${service.name}" is not available since "${timestamp}" 😔`);
        },
        refreshInterval: 9000
    });

    function Greeting(props) {
        const backendAvailable = props.available;
        if (backendAvailable) {
            return (
            <></>
            )
        }
        else {
            return (
            <>
           <Modal show={true} backdrop="static" keyboard={false}>
               <Modal.Title><center>Сервис временно недоступен</center></Modal.Title>
           </Modal>
            </>
            )
        }
    }

    return (
    <Router>
        <AuthContext.Provider value={[AuthState, setAuthState]}>
            <Greeting available={available} />
            <Authentication logoutUser={logout} loginUser={login}/>
            <NavbarC authenticated={AuthState.authenticated} username={AuthState.username} logoutUser={backendLogout} loginUser={login}/>
            <Switch>
                <Route exact path="/">
                    <Wishlist/>
                </Route>
                <Route path="/wishlist/:id" children={<DetailWishlistCard userId={AuthState.user_id} token={AuthState.token}/>} />
                <Route path="/:page" children={<Wishlist />} />
            </Switch>
        </AuthContext.Provider>
    </Router>
    );
}


export default App;
