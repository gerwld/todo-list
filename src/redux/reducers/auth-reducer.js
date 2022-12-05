import AuthService from "../../services/AuthService";

const SET_LOGOUT = "todo-list/tasks-reducer/SET_LOGOUT";
const SET_LOGIN = "todo-list/tasks-reducer/SET_LOGIN";
const SET_INIT = "todo-list/tasks-reducer/SET_INIT";
const SET_ERROR = "todo-list/tasks-reducer/SET_ERROR";
const SET_MESSAGE = "todo-list/tasks-reducer/SET_MESSAGE";

export const setLogout = () => ({ type: SET_LOGOUT });
export const setInit = (isInit) => ({ type: SET_INIT, isInit });
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
  case SET_INIT:
   return {
    ...state,
    isInit: action.isInit,
   };
  case SET_LOGOUT:
   return {
    ...state,
    authObj: null,
   };
  case SET_LOGIN:
   return {
    ...state,
    isInit: true,
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


export function initializeTC() {
 return async (dispatch) => {
  let session = localStorage.getItem("Bearer");
  if (session?.length) {
  await AuthService.getCurrentUser(session)
    .then(({data}) => {
     dispatch(setLogin({...data, token: session}));
    });
  }
  await dispatch(setInit(true));
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
    dispatch(setError(response.data.message));
   });
 };
}


export function loginTC(user) {
  return (dispatch) => {
   AuthService.authUser({
    email: user.login,
    password: user.pass,
   })
    .then((data) => {
     if (data.data) {
      user.remember && localStorage.setItem("Bearer", data.data);
      dispatch(setLogin({ remember: user.remember, email: user.login, token: data.data }));
     } else dispatch(setError("Unhandled error. Reload the page and try again."));
    })
    .catch(({ response }) => {
     dispatch(setError(response.data.message));
    });
  };
 }


export function logoutTC() {
  return (dispatch) => {
   localStorage.setItem("Bearer", "");
   dispatch(setLogout());
  };
 }

export default authReducer;
