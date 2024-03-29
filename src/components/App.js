import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  ErrorContext,
  errorState,
  AuthContext,
  authState,
} from './GlobalContext';
import { simpleLogout } from './auth/Logout';
import ErrorModal from './ErrorModal';
import ButtonAppBar from './Navbar';
import NestedWishlistsGrid from './wishlist/list/WishlistsGridList';
import WishlistDetailCard from './wishlist/detail/WishlistDetailCard';

function App() {
  // Errors
  const [ErrorState, setErrorState] = React.useState(errorState.noErrors);
  const ErrorsContextProviderValue = React.useMemo(
    () => ({ ErrorState, setErrorState }),
    [ErrorState]
  );

  // Auth
  const accessTokenCookie = Cookies.get('access_token');
  let authStateInitial = authState.anonymousUser;
  if (accessTokenCookie) {
    authState.loggedInUser.accessToken = accessTokenCookie;
    authState.loggedInUser.authenticated = true;
    authStateInitial = authState.loggedInUser;
  }
  const [AuthState, setAuthState] = React.useState(authStateInitial);
  const AuthContextProviderValue = React.useMemo(
    () => ({ AuthState, setAuthState }),
    [AuthState]
  );

  // Interceptors
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      if (error.response.status === 401 && AuthState.authenticated === true) {
        simpleLogout();
      } else if (
        error.response.status !== 400 &&
        error.response.status !== 422 &&
        error.response.status !== 401
      ) {
        setErrorState(errorState.anyError);
      }
      return Promise.reject(error);
    }
  );

  // Effects
  React.useEffect(() => {
    const getUserInfo = async () => {
      const { REACT_APP_API_V2_URL } = process.env;
      const userInfoEndpoint = `${REACT_APP_API_V2_URL}/users/info`;
      await axios
        .get(userInfoEndpoint)
        .then((response) => {
          setAuthState({
            ...AuthState,
            userId: response.data.id,
            username: response.data.username,
            authenticated: true,
          });
          // TODO: @devalv все говорит о том, что придется вкорячить CSRF и слать в целом не через заголовки, а через куки + использовать httpOnly: true?
          Cookies.set('access_token', AuthState.accessToken, {
            expires: 1 / 48,
            secure: true,
            sameSite: 'strict',
          });
        })
        .catch(() => {
          simpleLogout();
        });
    };
    if (AuthState.authenticated === true && AuthState.accessToken) {
      // Навешиваем данные о токене во всех возможные запросы
      axios.defaults.headers.common.Authorization = `Bearer ${AuthState.accessToken}`;
      // Прочитать информацию о пользователе
      getUserInfo();
    }
  }, [AuthState.authenticated]);

  return (
    <ErrorContext.Provider value={ErrorsContextProviderValue}>
      <AuthContext.Provider value={AuthContextProviderValue}>
        <ButtonAppBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NestedWishlistsGrid />} />
            <Route path="/wishlist/:id" element={<WishlistDetailCard />} />
          </Routes>
        </BrowserRouter>
        <ErrorModal />
      </AuthContext.Provider>
    </ErrorContext.Provider>
  );
}

export default App;
