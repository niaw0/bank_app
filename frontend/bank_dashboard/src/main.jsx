import "./index.css";
import { Root } from "./Root.jsx";
import { Dashboard } from "./Dashboard.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { Login } from "./Login.jsx";
import { Signup } from "./Signup.jsx";
import { NotFound } from "./NotFound.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
