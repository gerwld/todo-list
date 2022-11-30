const SET_EDITMODE = "todo-list/tasks-reducer/SET_EDITMODE";
const SET_CREATEMODE = "todo-list/tasks-reducer/SET_CREATEMODE";
const SET_CURRENT = "todo-list/tasks-reducer/SET_CURRENT";
const SET_CURRENT_TAGS = "todo-list/tasks-reducer/SET_CURRENT_TAGS";
const ADD_TASK = "todo-list/tasks-reducer/ADD_TASK";

export const setEditmode = (isEditMode, id) => ({ type: SET_EDITMODE, isEditMode, id});
export const setCreatemode = (isCreateMode) => ({ type: SET_CREATEMODE, isCreateMode });
export const setCurrent = (currentElement) => ({ type: SET_CURRENT, currentElement });
export const setCurrentTags = (currentTags) => ({ type: SET_CURRENT_TAGS, currentTags });
export const addTask = (taskObj) => ({ type: ADD_TASK, taskObj });


const init = {
 isEditMode: false,
 isCreateMode: false,
 currentElement: null,
 currentTags: null,
 selectedTag: null,
 tasks: [
  {
   id: "59h9bdf9n434",
   title: "Task Title",
   desc: "Task Description",
   status: 0,
   dateCreated: "1668380951687.2",
   lastEdit: "1668380951687.2",
   tags: ["some lable", "work"],
   subtasks: [
    { id: "49bkfdke4", title: "Subtask 1", isChecked: false },
    { id: "49bkfdkfe4", title: "Subtask 2", isChecked: false },
   ],
  },
 ],
};

const tasksReducer = (state = init, action) => {
 switch (action.type) {
  case SET_EDITMODE:
   return {
    ...state,
    isEditMode: action.isEditMode,
    currentElement: action.id ? state.tasks.find(e => e.id === action.id) : null
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
      isCreateMode: false
    }
  case SET_CURRENT_TAGS:
    return {
      ...state,
      currentTags: action.currentTags
    }
  default:
   return state;
 }
};

export const setTaskTC = (obj) => {
  let newObj = {...obj,
    dateCreated: Date.now(),
  };
  return (dispatch) => {
    dispatch(addTask(newObj));
  };
}

export default tasksReducer;
