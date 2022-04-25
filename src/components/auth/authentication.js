import axios from "axios";
import Cookies from "js-cookie";
import { useContext, useEffect } from "react";

import { anonymousUser, AuthContext } from "./auth-context";

const { REACT_APP_API_ORIGIN, REACT_APP_API_V2_URL } = process.env;

axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [REACT_APP_API_ORIGIN];
    const accessToken = Cookies.get("access_token");

    if (allowedOrigins.includes(origin)) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      config.headers["Content-Type"] = "application/json;charset=utf-8";
      config.headers["Accept"] = "application/json;charset=utf-8";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const backendLogout = async () => {
  const logoutEndpoint = `${REACT_APP_API_V2_URL}/logout`;
  try {
    await axios.get(logoutEndpoint);
  } catch (err) {
    console.error(err.message);
  }
  Cookies.remove("access_token");
  window.location.reload();
};

function NewAuthentication() {
  const [, setAuthState] = useContext(AuthContext);

  useEffect(() => {
    const setAccessTokenCookie = (authToken) => {
      window.history.pushState("object", document.title, "/");
      Cookies.set("access_token", authToken, { expires: 1, secure: true , sameSite: 'strict' });
    };

    const getUserInfo = async () => {
      const userInfoEndpoint = `${REACT_APP_API_V2_URL}/users/info`;
      try {
        const { data } = await axios.get(userInfoEndpoint);
        setAuthState({
          username: data["username"],
          authenticated: true,
          user_id: data["id"],
        });
      } catch (err) {
        console.error(err.message);
        setAccessTokenCookie(null);
      }
    };

    const authenticate = async () => {
      const authToken = (window.location.search.match(/authToken=([^&]+)/) ||
        [])[1];
      if (authToken) {
        setAccessTokenCookie(authToken);
      }

      const accessToken = Cookies.get("access_token") || null;
      if (accessToken) {
        await getUserInfo(accessToken);
      } else {
        setAuthState(anonymousUser);
      }
    };

    authenticate();
  }, [setAuthState]);

  return null;
}

export default NewAuthentication;
