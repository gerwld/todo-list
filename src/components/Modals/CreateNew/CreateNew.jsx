import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTaskTC } from "../../../redux/reducers/tasks-reducer";
import TaskForm from "../../TaskForm/TaskForm";

const CreateNew = () => {
 const disp = useDispatch();
 const {isCreateMode} = useSelector(({tasks}) => ({
  isCreateMode: tasks.isCreateMode
 }))

 const onSubmitCB = (obj) => {
  disp(setTaskTC(obj));
 }

 return (
  <div className={`modal ${isCreateMode ? 'modal_open' : ''}`}>
   <div className="modal_content">
   <TaskForm onSubmitCB={onSubmitCB} />
   <button className="btn_close">close</button>
   </div>
  </div>
 );
};

export default CreateNew;
