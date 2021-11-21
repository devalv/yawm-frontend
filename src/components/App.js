import React, {useEffect, useState} from 'react';
import NewAuthentication from "./auth/authentication";
import {anonymousUser, AuthContext} from "./auth/auth-context";
import HealthCheck from "./health-check";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavbarC from "./navbar";
import Wishlist from "./wishlist/List";
import DetailWishlistCard from "./wishlist/detailWishlistCard";

function App() {
    const [AuthState, setAuthState] = useState(anonymousUser);

    // Set app title
    useEffect(() => {
        document.title = 'YAWM';
    }, []);

    return (
        <Router>
            <AuthContext.Provider value={[AuthState, setAuthState]}>
                <HealthCheck/>
                <NewAuthentication/>
                <NavbarC authenticated={AuthState.authenticated} username={AuthState.username}/>
                <Switch>
                    <Route exact path="/">
                        <Wishlist/>
                    </Route>
                    <Route path="/wishlist/:id" children={<DetailWishlistCard userId={AuthState.user_id}/>} />
                    <Route path="/:page" children={<Wishlist />} />
                </Switch>
            </AuthContext.Provider>
        </Router>
    );
}

export default App;
