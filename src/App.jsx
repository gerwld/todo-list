import React from "react";
import { RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/";

const App = ({ isUser }) => {
 let routes = isUser === true ? privateRoutes : publicRoutes;
 return <RouterProvider router={routes} />;
};

export default App;
