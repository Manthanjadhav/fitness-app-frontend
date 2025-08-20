import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { AuthProvider } from "react-oauth2-code-pkce";
import App from "./App";
import authConfig from "./authConfig";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider authConfig={authConfig}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
