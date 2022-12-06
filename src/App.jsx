import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { getInitTC } from "./redux/reducers/auth-reducer";
import { privateRoutes, publicRoutes } from "./routes/";

const App = () => {
 const disp = useDispatch();
 const { authObj, isInit } = useSelector(({ init }) => ({
  authObj: init.authObj,
  isInit: init.isInit,
 }));

 useEffect(() => {
  if(!isInit) {
   disp(getInitTC());
  }
 }, [isInit]);

 const routes = authObj ? privateRoutes : publicRoutes;
 return isInit ? <RouterProvider router={routes} /> : <Loader />;
};

export default App;
