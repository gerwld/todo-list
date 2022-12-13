import React from "react";
import TaskForm from "../../TaskForm/TaskForm";
import { editTaskTC } from "../../../redux/reducers/tasks-reducer";
import { useDispatch } from "react-redux";
import toTitleCase from "../../../tools/toTitleCase";

const EditExist = ({ isEditMode, toggleEdit, currentObj }) => {
 const disp = useDispatch();

 const onSubmitCB = (obj) => {
  disp(editTaskTC(obj));
 };

 return (
  <div className={`modal ${isEditMode ? "modal_open" : "modal_close"}`}>
   <div className="modal_content">
    <h1 className="modal_title">Edit task: {currentObj?.title ? toTitleCase(currentObj?.title) : ''}</h1>
    <TaskForm onSubmitCB={onSubmitCB} close={toggleEdit} currentObj={currentObj} />
    <button onClick={toggleEdit} className="btn_close">close</button>
   </div>
  </div>
 );
};

export default EditExist;
