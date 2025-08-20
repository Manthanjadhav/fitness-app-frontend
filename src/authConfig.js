const authConfig = {
  clientId: "oauth2-pkce-client", // replace with your OAuth2 client ID
  authorizationEndpoint:
    "http://localhost:8443/realms/fitness-oauth2/protocol/openid-connect/auth",
  tokenEndpoint:
    "http://localhost:8443/realms/fitness-oauth2/protocol/openid-connect/token",
  redirectUri: window.location.origin, // e.g. http://localhost:5173 for Vite
  scopes: ["openid", "profile", "email"], // add more scopes if needed
  onRefreshTokenExpire: (event) => event.logIn(),
};

export default authConfig;
