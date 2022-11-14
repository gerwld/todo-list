const SET_INIT = "todo-list/tasks-reducer/SET_INIT";
const SET_EDITMODE = "todo-list/tasks-reducer/SET_EDITMODE";
const SET_CREATEMODE = "todo-list/tasks-reducer/SET_CREATEMODE";
const SET_CURRENT = "todo-list/tasks-reducer/SET_CURRENT";

const ADD_TASK = "todo-list/tasks-reducer/ADD_TASK";

export const setInit = (isInitialized) => ({ type: SET_INIT, isInitialized });
export const setEditmode = (isEditMode) => ({ type: SET_EDITMODE, isEditMode });
export const setCreatemode = (isCreateMode) => ({ type: SET_CREATEMODE, isCreateMode });
export const setCurrent = (currentElement) => ({ type: SET_CURRENT, currentElement });
export const addTask = (taskObj) => ({ type: ADD_TASK, taskObj });

const init = {
 isInitialized: false,
 isEditMode: false,
 isCreateMode: false,
 currentElement: null,
 tasks: [
  {
   id: "59h9bdf9n434",
   title: "Task Title",
   desc: "Task Description",
   status: 0,
   dateCreated: "1668380951687.2",
   lastEdit: "1668380951687.2",
   labels: ["some lable", "work"],
   subtasks: [
    { id: "49bkfdke4", title: "Subtask 1", isDone: false },
    { id: "49bkfdkfe4", title: "Subtask 2", isDone: false },
   ],
  },
 ],
};

const tasksReducer = (state = init, action) => {
 switch (action.type) {
  case SET_INIT:
   return {
    ...state,
    isInitialized: action.isInitialized,
   };
  case SET_EDITMODE:
   return {
    ...state,
    isEditMode: action.isEditModea,
   };
  case SET_CREATEMODE:
   return {
    ...state,
    isCreateMode: action.isCreateMode,
   };
  case SET_CURRENT:
   return {
    ...state,
    currentElement: action.currentElement,
   };
   case ADD_TASK:
    return {
      ...state,
      tasks: [...tasks, action.taskObj]
    }
  default:
   return state;
 }
};

export default tasksReducer;
