import { useHealthCheck } from "@webscopeio/react-health-check";
// import { Modal } from "react-bootstrap";
import React from "react";

const { REACT_APP_HEALTH_URL } = process.env;

function HealthCheck() {
  const { available } = useHealthCheck({
    service: {
      name: "yawm-backend",
      url: REACT_APP_HEALTH_URL,
    },
    onSuccess: ({ service, timestamp }) => {
      console.info(
        `Service "${service.name}" is available since "${timestamp}" 🎉`
      );
      window.location.reload();
    },
    onError: ({ service, timestamp }) => {
      console.error(
        `Service "${service.name}" is not available since "${timestamp}" 😔`
      );
    },
    refreshInterval: 25000,
  });
  if (available) {
    return null;
  } else {
    return (
      <center>Сервис временно недоступен</center>
    );
  }
}

export default HealthCheck;
