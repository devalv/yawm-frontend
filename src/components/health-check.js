import {useHealthCheck} from "@webscopeio/react-health-check";
import {Modal} from "react-bootstrap";
import React from "react";

const {REACT_APP_HEALTH_URL} = process.env;

function HealthCheck() {
    const { available } = useHealthCheck({
        service: {
            name: 'yawm-backend',
            url: REACT_APP_HEALTH_URL,
        },
        onSuccess: ({ service, timestamp }) => {
            console.log(`Service "${service.name}" is available since "${timestamp}" 🎉`);
            window.location.reload();
        },
        onError: ({ service, timestamp }) => {
            console.log(`Service "${service.name}" is not available since "${timestamp}" 😔`);
        },
        refreshInterval: 9000
    });
    if (available) {
        return null;
    }
    else {
        return (
            <Modal show={true} backdrop="static" keyboard={false}>
                <Modal.Title><center>Сервис временно недоступен</center></Modal.Title>
            </Modal>
        )
    }

}

export default HealthCheck;