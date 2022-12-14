import { createHashRouter, Navigate } from "react-router-dom";
import Login from "../components/Login/Login";

const publicRoutes = createHashRouter([
 {
  path: "*",
  element: <Navigate to="login" replace />,
 },
 {
  path: "/login",
  element: <Login />,
 },
 {
  path: "/sign-up",
  element: <Login isReg={true} />,
 },
]);

export default publicRoutes;
