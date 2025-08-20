import { useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

export default function Login() {
  const { tokenData, logIn, logOut, token } = useContext(AuthContext);
  const isAuthenticated = !!token;
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {isAuthenticated ? "Welcome 🎉" : "Welcome Back 👋"}
        </h1>
        <p className="text-gray-500 mb-8">
          {isAuthenticated
            ? "You are logged in successfully."
            : "Sign in securely with your account to access the dashboard."}
        </p>

        {!isAuthenticated ? (
          <button
            onClick={() => logIn()}
            className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-md hover:bg-indigo-700 transition duration-300"
          >
            🔐 Login with Keycloak
          </button>
        ) : (
          <button
            onClick={logOut}
            className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold text-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            🚪 Logout
          </button>
        )}

        <p className="mt-6 text-sm text-gray-400">
          Powered by{" "}
          <span className="font-medium text-indigo-500">Keycloak</span>
        </p>

        {isAuthenticated && (
          <div className="mt-6 text-left text-sm bg-gray-100 p-4 rounded-lg shadow-inner">
            <p className="font-semibold text-gray-700 mb-1">📋 Token Data:</p>
            <pre className="text-xs text-gray-600">
              {JSON.stringify(tokenData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
