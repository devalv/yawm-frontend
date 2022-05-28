import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ErrorContext, errorState } from './GlobalContext';
import ErrorModal from './ErrorModal';
import HealthCheck from "./HealthCheck";
// import NewAuthentication from "./auth/authentication";
// import {anonymousUser, AuthContext, tokenInfo, TokenContext} from "./auth/auth-context";
// import NavbarC from "./navbar";
import NestedWishlistsGrid from "./wishlist/list/WishlistsGridList";
// import DetailWishlistCard from "./wishlist/detailWishlistCard";


function App() {
  const [ErrorState, setErrorState] = React.useState(errorState.noErrors);
  const ErrorsContextProviderValue = React.useMemo(() => ({ErrorState, setErrorState}), [ErrorState]);

  return (
    <ErrorContext.Provider value={ErrorsContextProviderValue}>
        <HealthCheck />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NestedWishlistsGrid />}/>
            {/* <Route */}
            {/*  path="/wishlist/:id" */}
            {/*  element={<DetailWishlistCard userId={AuthState.user_id} />} */}
            {/* /> */}
            <Route path="/:page" element={<NestedWishlistsGrid />} />
          </Routes>
        </BrowserRouter>
        <ErrorModal />
     </ErrorContext.Provider>
  );
}

export default App;
