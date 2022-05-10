import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./components/App";

const DEBUG = process.env.REACT_APP_DEBUG;

Sentry.init({
  debug: DEBUG || false,
  release: "yawm-frontend@0.3.0",
  environment: (DEBUG) ? "dev": "production",
  dsn: 'https://c7c50c25cc3448c3b7f9da3915c05110@o1201644.ingest.sentry.io/6373679',
  integrations: [new BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
    <App />
  </React.StrictMode>,
);