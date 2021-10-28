import React, {useState} from "react";
import AuthContext from "./auth/authContext";

import Authentication from "./auth/Authentication";
import Wishlist from "./wishlist/List";


function App() {
    const [authState, setauthState] = useState({
        token: '',
        username: '',
        authenticated: false
    });

    // console.log('auth state in app js:', authState)

    return (
        <AuthContext.Provider value={[authState, setauthState]}>
            <Authentication/>
            <Wishlist/>
        </AuthContext.Provider>
    );
}

export default App;
