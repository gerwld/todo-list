import axios from "axios";
import AuthService from "../../services/AuthService";
import { onTaskLogout } from "./tasks-reducer";

const SET_LOGOUT = "todo-list/auth-reducer/SET_LOGOUT";
const SET_LOGIN = "todo-list/auth-reducer/SET_LOGIN";
const SET_INIT_AUTH = "todo-list/auth-reducer/SET_INIT_AUTH";
const SET_ERROR = "todo-list/auth-reducer/SET_ERROR";
const SET_MESSAGE = "todo-list/auth-reducer/SET_MESSAGE";

export const setLogout = () => ({ type: SET_LOGOUT });
export const setInitAuth = (isInit) => ({ type: SET_INIT_AUTH, isInit });
export const setLogin = (authObj) => ({ type: SET_LOGIN, authObj });
export const setError = (body) => ({ type: SET_ERROR, body });
export const setMessage = (body) => ({ type: SET_MESSAGE, body });

const init = {
 isInit: false,
 authObj: null,
 currError: null,
 currMessage: null,
};

const authReducer = (state = init, action) => {
 switch (action.type) {
  case SET_INIT_AUTH:
   return {
    ...state,
    isInit: action.isInit,
   };
  case SET_LOGOUT:
   return {
    ...state,
    isInit: false,
    currError: null,
    currMessage: null,
    authObj: null,
   };
  case SET_LOGIN:
   return {
    ...state,
    currError: null,
    currMessage: null,
    authObj: action.authObj,
   };
  case SET_ERROR:
   return {
    ...state,
    currError: action.body,
   };
  case SET_MESSAGE:
   return {
    ...state,
    currMessage: action.body,
   };
  default:
   return state;
 }
};


export function getInitTC() {
 return async (dispatch) => {
  let session = localStorage.getItem("Bearer");
  if (session?.length) {
  await AuthService.getCurrentUser(session)
    .then(({data}) => {
     dispatch(setLogin(data));
     axios.defaults.headers.common = {'Authorization': `Bearer ${session}`};
    });
  }
  await dispatch(setInitAuth(true));
 };
}


export function registerTC(user) {
 return async (dispatch) => {
  AuthService.createUser({
   email: user.login,
   password: user.pass,
   username: user.login,
  })
   .then(({ data }) => {
    if (data?.email) {
     dispatch(setError(null));
     dispatch(setMessage(`You are successfully registered! Please login now.`));
    }
   })
   .catch(({ response }) => {
    dispatch(setError(response.data.message || "Unhandled error"));
   });
 };
}


export function loginTC(user) {
 return (dispatch) => {
  AuthService.authUser({
   email: user.login,
   password: user.pass,
  })
   .then(({ data }) => {
    if (data) {
     user.remember && localStorage.setItem("Bearer", data);
     axios.defaults.headers.common = {'Authorization': `Bearer ${data}`};
     dispatch(setLogin({ email: user.login }));
    } else dispatch(setError("Unhandled error. Reload the page and try again."));
   })
   .catch(({ response }) => {
    dispatch(setError(response.data.message || "Unhandled error"));
   });
 };
}


export function logoutTC() {
 return (dispatch) => {
  localStorage.removeItem("Bearer");
  dispatch(setLogout());
  dispatch(onTaskLogout());
 };
}

export default authReducer;
