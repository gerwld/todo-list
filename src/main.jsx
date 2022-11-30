import React from "react";
import ReactDOM from "react-dom/client";
import Init from "./Init";
import "./index.css";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <Provider store={store}>
   <HashRouter>
    <Init />
   </HashRouter>
  </Provider>
 </React.StrictMode>
);
