import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { setInit } from "./redux/reducers/auth-reducer";
import { privateRoutes, publicRoutes } from "./routes/";

const App = () => {
 const disp = useDispatch();
 const { authObj, isInit } = useSelector(({ init }) => ({
  authObj: init.authObj,
  isInit: init.isInit,
 }));

 useEffect(() => {
  //request imit. delay
  setTimeout(() => {
   disp(setInit(true));
  }, 1000);
 }, []);

 const routes = authObj ? privateRoutes : publicRoutes;
 return isInit ? <RouterProvider router={routes} /> : <Loader />;
};

export default App;
