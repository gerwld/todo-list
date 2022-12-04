import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import tasksReducer from "./reducers/tasks-reducer";
import createSagaMiddleware from 'redux-saga';

const reducer = {
 init: authReducer,
 tasks: tasksReducer,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({ reducer, 
 devtools: process.env.NODE_ENV !== "production" }, applyMiddleware(sagaMiddleware));

export default store;
