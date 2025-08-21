import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import { AuthProvider } from "react-oauth2-code-pkce";
import authConfig from "./authConfig";
import "./index.css";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider
    authConfig={authConfig}
    loadingComponent={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    }
  >
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
