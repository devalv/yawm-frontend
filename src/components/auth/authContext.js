import {createContext} from "react";

const AuthContext = createContext({username: "", token: "", authenticated: false});

export default AuthContext;
