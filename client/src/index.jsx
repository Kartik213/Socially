import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import store from "./state/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  // </React.StrictMode>
);
