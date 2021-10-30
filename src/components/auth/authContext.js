import {createContext} from "react";

const AuthContext = createContext({username: null, token: null, authenticated: false, login: null, logout: null});

export default AuthContext;
