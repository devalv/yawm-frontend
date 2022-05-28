import * as React from "react";

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
