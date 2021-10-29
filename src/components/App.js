import React, {useState} from "react";
import AuthContext from "./auth/authContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Authentication from "./auth/Authentication";
import Wishlist  from "./wishlist/List";
import DetailWishlistCard from "./wishlist/detailWishlistCard";


function App() {
    const [authState, setauthState] = useState({
        token: '',
        username: '',
        authenticated: false
    });

    // console.log('auth state in app js:', authState)

    return (
    <Router>
        {/*TODO: @devalv navbar as component*/}
        <AuthContext.Provider value={[authState, setauthState]}>
            <Authentication/>
            <br/><br/>
            <Switch>
                <Route exact path="/">
                    <Wishlist/>
                </Route>
                <Route path="/wishlist/:id" children={<DetailWishlistCard />} />
            </Switch>
        </AuthContext.Provider>
    </Router>
    );
}


export default App;
