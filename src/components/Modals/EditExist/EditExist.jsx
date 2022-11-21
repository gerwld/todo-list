import React from 'react'
import TaskForm from '../../TaskForm/TaskForm';

const EditExist = ({isEditMode, toggleEdit, currentObj}) => {


  return (
    <div className={`modal ${isEditMode ? "modal_open" : "modal_close"}`}>
    <div className="modal_content">
     <h1 className="modal_title">Edit task: {currentObj?.title}</h1>
     <TaskForm onSubmitCB='' close={toggleEdit} currentObj={currentObj} isEditMode={true} />
     <button onClick={toggleEdit} className="btn_close">
      close
     </button>
    </div>
   </div>
  )
}

export default EditExist