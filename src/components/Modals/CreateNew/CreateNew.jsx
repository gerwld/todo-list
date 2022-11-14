import React from "react";
import { useDispatch } from "react-redux";
import { setTaskTC } from "../../../redux/reducers/tasks-reducer";
import TaskForm from "../../TaskForm/TaskForm";

const CreateNew = () => {
 const disp = useDispatch();

 const onSubmitCB = (obj) => {
  disp(setTaskTC(obj));
 }

 return (
  <div>
   <TaskForm onSubmitCB={onSubmitCB} />
  </div>
 );
};

export default CreateNew;
