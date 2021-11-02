import {createContext} from "react";

export const anonymousUser = {username: null, token: '', authenticated: false}
export const AuthContext = createContext({});
AuthContext.displayName = 'AuthenticationContext';
