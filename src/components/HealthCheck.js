import { useHealthCheck } from "@webscopeio/react-health-check";
import React from "react";
import { ErrorContext, errorState } from './GlobalContext';


export default function HealthCheck() {
  const { REACT_APP_HEALTH_URL } = process.env;
  const { setErrorState } = React.useContext(ErrorContext);
  const { available } = useHealthCheck({
    service: {
      name: "yawm-backend",
      url: REACT_APP_HEALTH_URL,
    },
    refreshInterval: 25000,
  });
  if (!available) {
    setErrorState(errorState.anyError);
    return <center><h2>Сервис временно недоступен</h2></center>;
  }
  return null;
}
