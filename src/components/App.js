import React, { useState } from "react";
import NewAuthentication from "./auth/authentication";
import {anonymousUser, AuthContext, tokenInfo, TokenContext} from "./auth/auth-context";
import HealthCheck from "./health-check";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavbarC from "./navbar";
import Wishlist from "./wishlist/listWishlists";
import DetailWishlistCard from "./wishlist/detailWishlistCard";

function App() {
  const [AuthState, setAuthState] = useState(anonymousUser);
  const [TokenState, setTokenState] = useState(tokenInfo);

  return (
    <BrowserRouter>
      <TokenContext.Provider value ={[TokenState, setTokenState]}>
        <AuthContext.Provider value={[AuthState, setAuthState]}>
          <HealthCheck />
          <NewAuthentication />
          <NavbarC
            authenticated={AuthState.authenticated}
            username={AuthState.username}
          />
          <Routes>
            <Route path="/" element={<Wishlist />}/>
            <Route
              path="/wishlist/:id"
              element={<DetailWishlistCard userId={AuthState.user_id} />}
            />
            <Route path="/:page" element={<Wishlist />} />
          </Routes>
        </AuthContext.Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}

export default App;
