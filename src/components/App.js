import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';
import { ErrorContext, errorState } from './GlobalContext';
import ErrorModal from './ErrorModal';
// import NewAuthentication from "./auth/authentication";
// import {anonymousUser, AuthContext, tokenInfo, TokenContext} from "./auth/auth-context";
// import NavbarC from "./navbar";

import NestedWishlistsGrid from "./wishlist/list/WishlistsGridList";
// import DetailWishlistCard from "./wishlist/detailWishlistCard";


function App() {
  const [ErrorState, setErrorState] = React.useState(errorState.noErrors);
  const ErrorsContextProviderValue = React.useMemo(() => ({ErrorState, setErrorState}), [ErrorState]);

  axios.interceptors.response.use((response) => response, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    setErrorState(errorState.anyError);
    return Promise.reject(error);
  });

  return (
    <ErrorContext.Provider value={ErrorsContextProviderValue}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NestedWishlistsGrid />}/>
            {/* <Route */}
            {/*  path="/wishlist/:id" */}
            {/*  element={<DetailWishlistCard userId={AuthState.user_id} />} */}
            {/* /> */}
          </Routes>
        </BrowserRouter>
        <ErrorModal />
     </ErrorContext.Provider>
  );
}

export default App;
