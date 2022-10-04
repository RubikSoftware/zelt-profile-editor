import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LuxonUtils from "@date-io/luxon";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
