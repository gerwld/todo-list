import React from "react";
import TaskForm from "../../TaskForm/TaskForm";

const CreateNew = () => {

 const onSubmitCB = (obj) => {
  console.log(obj);
 }

 return (
  <div>
   <TaskForm onSubmitCB={onSubmitCB} />
  </div>
 );
};

export default CreateNew;
