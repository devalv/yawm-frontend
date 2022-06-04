import * as React from "react";

// TODO: @devalv use types?
export const errorState = {
  anyError: {
    showErrorModal: true
  },
  noErrors: {
    showErrorModal: false
  }
};

export const ErrorContext = React.createContext({
  showErrorModal: errorState.noErrors,
  setErrorState: () => {}
});


// TODO: @devalv use types?
export const authState = {
  anonymousUser: {
    username: null,
    authenticated: false,
    userId: null,
    accessToken: null,
  },
  loggedInUser: {
    username: null,
    authenticated: true,
    userId: null,
    accessToken: null,
  }
};

export const AuthContext = React.createContext(authState.anonymousUser);
