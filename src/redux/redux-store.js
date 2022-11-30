import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import tasksReducer from "./reducers/tasks-reducer";

const reducer = {
 init: authReducer,
 tasks: tasksReducer,
};

const store = configureStore({ reducer, 
 devtools: process.env.NODE_ENV !== "production" });

export default store;
