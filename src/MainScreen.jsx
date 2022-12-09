import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Aside from "./components/Aside/Aside";
import Loader from "./components/Loader/Loader";
import LoaderMid from "./components/Loader/LoaderMid";
import CreateNew from "./components/Modals/CreateNew/CreateNew";
import EditExist from "./components/Modals/EditExist/EditExist";
import SubmitDelete from "./components/Modals/SubmitDelete/SubmitDelete";
import StatusSection from "./components/StatusSection/StatusSection";
import { logoutTC } from "./redux/reducers/auth-reducer";
import { getTasksTC, setCreatemode, setCurrentSort, setCurrentTags, setDeletemode, setEditmode } from "./redux/reducers/tasks-reducer";
import onlyUnique from "./tools/onlyUnique";

const MainScreen = () => {
 const disp = useDispatch();
 const {currentTag} = useParams();
 const [tagsLoader, setLoad] = useState(false);
 const { isInit, tasks, sortedTasks, tags, isCreateMode, isEditMode, isDeleteMode, pendingDeleteID, currentObj, currentTagS } = useSelector(({ tasks }) => ({
  isInit: tasks.isInit,
  tasks: tasks.tasks,
  sortedTasks: tasks.sortedTasks,
  tags: tasks.currentTags,
  isCreateMode: tasks.isCreateMode,
  isEditMode: tasks.isEditMode,
  isDeleteMode: tasks.isDeleteMode,
  pendingDeleteID: tasks.pendingDeleteID,
  currentObj: tasks.currentElement,
  currentTagS: tasks.currentTag
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
  if(currentTagS !== currentTag) {
   setLoad(true);
   disp(setCurrentSort(currentTag?.replace(/_/g," ")));
  }
  //imitate pending for ux flow
  setTimeout(() => setLoad(false), 300);
 }, [currentTag])


 useEffect(() => {
  if (tasks?.length) {
   let allTags = tasks.map((e) => e.tags).flat(1);
   let uniqueTags = allTags.filter(onlyUnique);
   disp(setCurrentTags(uniqueTags));
  } else if(isInit) {
   disp(setCurrentTags([]));
  }
 }, [tasks]);

 return (
  <>
   <div className="app_main">
    <Aside tags={tags} currentTag={currentTagS} toggleNew={toggleCreate} onLogout={onLogout} isInit={isInit}/>
    {tasks?.length ? 
     <div className="app_sections">
     <StatusSection items={sortedTasks || tasks} title={"to do"} stat={0} />
     <StatusSection items={sortedTasks || tasks} title={"in-progress"} stat={1} />
     <StatusSection items={sortedTasks || tasks} title={"done"} stat={2} />
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

    {tagsLoader ? <LoaderMid isPending={true} /> : ''}
   </div>
  </>
 );
};

export default MainScreen;
