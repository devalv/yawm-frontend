import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

const { REACT_APP_SENTRY_DSN } = process.env;

Sentry.init({
    debug: true,
    dsn: REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
