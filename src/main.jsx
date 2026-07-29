import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./Components/Store/store.jsx";
import { AuthProvider } from "./Utils/AuthContext.jsx";
const Container = document.getElementById("root");
if (Container) {
  createRoot(Container).render(
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
} else {
  throw new Error("Root file is not found ");
}
