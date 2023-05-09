import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Auth0Provider
    domain="dev-6r44a0lgnhjg57sr.us.auth0.com"
    clientId="l1lBkeO9SYMpTUDB7Ff5XyFcoi2mqfT9"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/profile",
    }}
  >
    <App />
  </Auth0Provider>
);
