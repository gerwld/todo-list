const SET_LOGOUT = "todo-list/tasks-reducer/SET_LOGOUT";
const SET_INIT = "todo-list/tasks-reducer/SET_INIT";

export const setLogout = () => ({ type: SET_LOGOUT });
export const setInit = (isInit) => ({ type: SET_INIT, isInit });

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
    currentObj: null,
   };
  default:
   return state;
 }
};

export default authReducer;
