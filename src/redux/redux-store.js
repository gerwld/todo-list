import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasks-reducer";

const reducer = {
 tasks: tasksReducer,
};

const store = configureStore({ reducer, 
 devtools: process.env.NODE_ENV !== "production" });

export default store;
