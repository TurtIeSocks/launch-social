import React from "react";
import { render } from "react-dom";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./components/App";
import config from "./config";
import RedBox from "redbox-react";

document.addEventListener("DOMContentLoaded", () => {
  let reactElement = document.getElementById("app");

  if (reactElement) {
    if (config.env === "development") {
      try {
        render(
          <Auth0Provider
            domain="dev-launch-social.us.auth0.com"
            clientId="lInQXf4NGzwDq1VoheppA0D4ybqsdWJV"
            redirectUri={window.location.origin}
          >
            <App />
          </Auth0Provider>, reactElement
        )
      } catch (e) {
        render(<RedBox error={e} />, reactElement);
      }
    } else {
      render(<App />, reactElement);
    }
  }
});
