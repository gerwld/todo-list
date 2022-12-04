import AuthService from "../../services/AuthService";

const SET_LOGOUT = "todo-list/tasks-reducer/SET_LOGOUT";
const SET_LOGIN = "todo-list/tasks-reducer/SET_LOGIN";
const SET_INIT = "todo-list/tasks-reducer/SET_INIT";
const SET_ERROR = "todo-list/tasks-reducer/SET_ERROR";

export const setLogout = () => ({ type: SET_LOGOUT });
export const setInit = (isInit) => ({ type: SET_INIT, isInit });
export const setLogin = (authObj) => ({ type: SET_LOGIN, authObj });
export const setError = (body) => ({ type: SET_ERROR, body });

const init = {
 isAuth: false,
 isInit: false,
 authObj: null,
 currError: null,
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
    authObj: action.authObj,
   };
   case SET_ERROR:
    return {
     ...state,
     currError: action.body,
    };
  default:
   return state;
 }
};

export function loginTC(user) {
 return dispatch => {
  AuthService.authUser({
    "email": user.login,
    "password": user.pass
  }).then(data => {
    dispatch(setLogin({...user, token: data.data}));
    dispatch(setError(null));
  }).catch((data) => {
    dispatch(setError(data.message));
  })
 }
}

export function registerTC(user) {
  return async dispatch => {
   AuthService.createUser(
    {
      "email": user.login,
      "password": user.pass,
      "username": user.login
    }).then(data => {
      dispatch(setError(null));
    }
    ).catch(({response}) => {
      dispatch(setError(response.data.message));
    })
  }
 }

export default authReducer;
