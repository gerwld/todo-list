import TasksService from "../../services/TasksService";

const SET_ERROR = "todo-list/tasks-reducer/SET_ERROR";
const SET_INIT = "todo-list/tasks-reducer/SET_INIT";
const SET_EDITMODE = "todo-list/tasks-reducer/SET_EDITMODE";
const SET_CREATEMODE = "todo-list/tasks-reducer/SET_CREATEMODE";
const SET_TASKS = "todo-list/tasks-reducer/SET_TASKS";
const SET_CURRENT = "todo-list/tasks-reducer/SET_CURRENT";
const SET_CURRENT_TAGS = "todo-list/tasks-reducer/SET_CURRENT_TAGS";
const ADD_TASK = "todo-list/tasks-reducer/ADD_TASK";

export const setError = (body) => ({type: SET_ERROR, body});
export const setInit = (isInit) => ({type: SET_INIT, isInit});
export const setEditmode = (isEditMode, id) => ({ type: SET_EDITMODE, isEditMode, id });
export const setCreatemode = (isCreateMode) => ({ type: SET_CREATEMODE, isCreateMode });
export const setCurrent = (currentElement) => ({ type: SET_CURRENT, currentElement });
export const setCurrentTags = (currentTags) => ({ type: SET_CURRENT_TAGS, currentTags });
export const addTask = (taskObj) => ({ type: ADD_TASK, taskObj });
export const setAllTasks = (payload) => ({ type: SET_TASKS, payload });

const init = {
 isInit: false,
 isEditMode: false,
 isCreateMode: false,
 currentElement: null,
 currentTags: null,
 selectedTag: null,
 currentError: null,
 tasks: [
  // {
  //  id: "59h9bdf9n434",
  //  title: "Task Title",
  //  desc: "Task Description",
  //  status: 0,
  //  dateCreated: "1668380951687.2",
  //  lastEdit: "1668380951687.2",
  //  tags: ["some lable", "work"],
  //  subtasks: [
  //   { id: "49bkfdke4", title: "Subtask 1", isChecked: false },
  //   { id: "49bkfdkfe4", title: "Subtask 2", isChecked: false },
  //  ],
  // },
 ],
};

const tasksReducer = (state = init, action) => {
 switch (action.type) {
  case SET_INIT:
   return {
    ...state,
    isInit: action.isInit,
   };
  case SET_EDITMODE:
   return {
    ...state,
    isEditMode: action.isEditMode,
    currentElement: action.id ? state.tasks.find((e) => e.id === action.id) : null,
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
    tasks: [action.taskObj, ...state.tasks],
    isCreateMode: false,
   };
  case SET_TASKS:
   return {
    ...state,
    isInit: true,
    tasks: action.payload.reverse(),
   };
  case SET_CURRENT_TAGS:
   return {
    ...state,
    currentTags: action.currentTags,
   };
  case SET_ERROR:
   return {
    ...state,
    currentError: action.body,
   };
  default:
   return state;
 }
};

export const setTaskTC = (obj) => {
 let newObj = { ...obj, dateCreated: Date.now() };
 return (dispatch) => {
  TasksService.createTask(newObj)
   .then(({data}) => {
    dispatch(addTask(data));
   })
   .catch((error) => {
    dispatch(setInit(true));
    dispatch(setError(error.message));
   });
 };
};

export const getTasksTC = () => {
 return (dispatch) => {
  TasksService.getTasks()
   .then(({ data }) => {
    dispatch(setAllTasks(data));
   })
   .catch((error) => {
    dispatch(setError(error.message));
   });
 };
};

export default tasksReducer;
