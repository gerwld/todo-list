const init = {
 isInitialized: false,
 tasks: [
  {id: '59h9bdf9n434', title: 'Task Title', desc: 'Task Description', 
  dateCreated: '1668380951687.2', lastEdit: '1668380951687.2',
  labels: ['some lable', 'work'], 
  subtasks: [{id: '49bkfdke4', title: 'Subtask 1', isDone: false}, {id: '49bkfdkfe4', title: 'Subtask 2', isDone: false}]}
 ]
};

const tasksReducer = (state = init, action) => {
 switch (action.type) {
  default:
   return state;
 }
};

export default tasksReducer;
