import { createHashRouter } from "react-router-dom";
import MainScreen from "../MainScreen";

const privateRoutes = createHashRouter([
 {
  path: "/login",
  element: <MainScreen />,
 },
 {
  path: "/",
  element: <MainScreen />,
 },
 {
  path: "/tags/*",
  element: <MainScreen />,
 },
]);

export default privateRoutes;
