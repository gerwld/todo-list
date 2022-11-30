import { createHashRouter, Navigate } from "react-router-dom";
import MainScreen from "../MainScreen";

const privateRoutes = createHashRouter([
 {
  path: "*",
  element: <Navigate to="/" replace />,
 },
 {
  path: "/",
  element: <MainScreen />,
 },
]);

export default privateRoutes;
