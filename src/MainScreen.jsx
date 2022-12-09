import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aside from "./components/Aside/Aside";
import Loader from "./components/Loader/Loader";
import CreateNew from "./components/Modals/CreateNew/CreateNew";
import EditExist from "./components/Modals/EditExist/EditExist";
import SubmitDelete from "./components/Modals/SubmitDelete/SubmitDelete";
import StatusSection from "./components/StatusSection/StatusSection";
import { logoutTC } from "./redux/reducers/auth-reducer";
import { getTasksTC, setCreatemode, setCurrentTags, setDeletemode, setEditmode } from "./redux/reducers/tasks-reducer";
import onlyUnique from "./tools/onlyUnique";

const MainScreen = () => {
 const disp = useDispatch();
 const { isInit, tasks, tags, isCreateMode, isEditMode, isDeleteMode, pendingDeleteID, currentObj } = useSelector(({ tasks }) => ({
  isInit: tasks.isInit,
  tasks: tasks.tasks,
  tags: tasks.currentTags,
  isCreateMode: tasks.isCreateMode,
  isEditMode: tasks.isEditMode,
  isDeleteMode: tasks.isDeleteMode,
  pendingDeleteID: tasks.pendingDeleteID,
  currentObj: tasks.currentElement
 }));

 const toggleCreate = () => {
  disp(setCreatemode(!isCreateMode));
 }

 const toggleEdit = () => {
  disp(setEditmode(!isEditMode));
 }

 const toggleDelete = () => {
  disp(setDeletemode(!isDeleteMode));
 }

 const onLogout = () => {
  disp(logoutTC());
 }

 useEffect(() => {
  setTimeout(() => {
   disp(getTasksTC());
  }, 200);
 }, []);


 useEffect(() => {
  if (tasks?.length) {
   let allTags = tasks.map((e) => e.tags).flat(1);
   let uniqueTags = allTags.filter(onlyUnique);
   disp(setCurrentTags(uniqueTags));
  } else {
   disp(setCurrentTags([]));
  }
 }, [tasks]);

 return (
  <>
   <div className="app_main">
    <Aside tags={tags} toggleNew={toggleCreate} onLogout={onLogout} isInit={isInit}/>
    {tasks?.length ? 
     <div className="app_sections">
     <StatusSection items={tasks} title={"to do"} stat={0} />
     <StatusSection items={tasks} title={"in-progress"} stat={1} />
     <StatusSection items={tasks} title={"done"} stat={2} />
    </div> :
    isInit ? 
    <div className="no_ts">
     <h1>No tasks yet</h1>
     <p>Be sure to add your first task</p>
     <button onClick={toggleCreate}>Add task</button>
    </div> :
    <Loader />}
    

     {/* //--- MODALS ---// */}
    <CreateNew toggleNew={toggleCreate} isCreateMode={isCreateMode} />
    <EditExist toggleEdit={toggleEdit} isEditMode={isEditMode} currentObj={currentObj} />
    <SubmitDelete toggleDelete={toggleDelete} isDeleteMode={isDeleteMode} pendingDeleteID={pendingDeleteID} />
   </div>
  </>
 );
};

export default MainScreen;
