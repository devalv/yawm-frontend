import {createContext} from "react";

export const anonymousUser = {username: null, token: '', authenticated: false, user_id: null}
export const AuthContext = createContext({});
AuthContext.displayName = 'AuthenticationContext';
