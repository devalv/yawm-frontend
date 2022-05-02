import { createContext } from "react";

export const anonymousUser = {
  username: null,
  authenticated: false,
  user_id: null,
};

export const tokenInfo = {
  access_token: null,
  refresh_token: null,
  token_type: null
}

export const AuthContext = createContext(anonymousUser);
export const TokenContext = createContext(tokenInfo);

AuthContext.displayName = "Authentication Context";
TokenContext.displayName = "Token Context";
