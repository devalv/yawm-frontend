import {createContext} from "react";

export const anonymousUser = {username: null, authenticated: false, user_id: null}
export const AuthContext = createContext(anonymousUser);

AuthContext.displayName = 'Authentication Context';
