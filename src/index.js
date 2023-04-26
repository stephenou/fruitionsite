import React from "react";
import ReactDOM from "react-dom";

import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker/registerServiceWorker";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

registerServiceWorker();
