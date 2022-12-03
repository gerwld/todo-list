import AuthService from "../../services/AuthService";

const SET_LOGOUT = "todo-list/tasks-reducer/SET_LOGOUT";
const SET_LOGIN = "todo-list/tasks-reducer/SET_LOGIN";
const SET_INIT = "todo-list/tasks-reducer/SET_INIT";

export const setLogout = () => ({ type: SET_LOGOUT });
export const setInit = (isInit) => ({ type: SET_INIT, isInit });
export const setLogin = (authObj) => ({ type: SET_LOGIN, authObj });

const init = {
 isAuth: false,
 isInit: false,
 authObj: null,
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
  default:
   return state;
 }
};

export function loginTC(user) {
 return dispatch => {
  console.log('login:', user);
 }
}

export function registerTC(user) {
  return async dispatch => {
   let resp = await AuthService.createUser(
    {
      "email": user.login,
      "password": user.pass,
      "username": user.login
    });
    console.log(resp);
  }
 }

export default authReducer;
