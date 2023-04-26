import React from "@types/react";
import ReactDOM from "@types/react-dom";

import App from "./App.tsx";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
