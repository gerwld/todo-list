import React from "react";
import { useDispatch } from "react-redux";
import { deleteTaskTC } from "../../../redux/reducers/tasks-reducer";

const SubmitDelete = ({ isDeleteMode, toggleDelete, pendingDeleteID}) => {
 const disp = useDispatch();

 const onSubmitCB = () => {
  if(pendingDeleteID || pendingDeleteID === 0) {
    disp(deleteTaskTC(pendingDeleteID));
  }
}

 return (
  <div className={`modal modal_delete ${isDeleteMode  ? "modal_open" : "modal_close"}`}>
   <div className="modal_content">
    <h1 className="modal_title">Are you sure you want to delete this task?</h1>
    <div className="del_buttons">
     <button onClick={onSubmitCB} className="del_btn">Delete</button>
     <button onClick={toggleDelete} className="del_btn">Cancel</button>
    </div>

    <button onClick={toggleDelete} className="btn_close">close</button>
   </div>
  </div>
 );
};

export default SubmitDelete;
