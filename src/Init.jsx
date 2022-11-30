import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aside from "./components/Aside/Aside";
import Login from "./components/Login/Login";
import CreateNew from "./components/Modals/CreateNew/CreateNew";
import EditExist from "./components/Modals/EditExist/EditExist";
import StatusSection from "./components/StatusSection/StatusSection";
import { setCreatemode, setCurrentTags, setEditmode } from "./redux/reducers/tasks-reducer";
import onlyUnique from "./tools/onlyUnique";

const Init = () => {
 const disp = useDispatch();
 const { tasks, tags, isCreateMode, isEditMode, currentObj } = useSelector(({ tasks }) => ({
  tasks: tasks.tasks,
  tags: tasks.currentTags,
  isCreateMode: tasks.isCreateMode,
  isEditMode: tasks.isEditMode,
  currentObj: tasks.currentElement
 }));

 const toggleCreate = () => {
  disp(setCreatemode(!isCreateMode));
 }

 const toggleEdit = () => {
  disp(setEditmode(!isEditMode));
 }

 useEffect(() => {
  if(tasks?.length) {
   let allTags = tasks.map((e) => e.tags).flat(1);
   let uniqueTags = allTags.filter(onlyUnique);
   disp(setCurrentTags(uniqueTags));
  }
 }, [tasks]);

 return <Login/>

 return (
  <>
   <div className="app_main">
    <Aside tags={tags} toggleNew={toggleCreate}/>
    <div className="app_sections">
     <StatusSection items={tasks} title={"to do"} stat={0} />
     <StatusSection items={tasks} title={"in-progress"} stat={1} />
     <StatusSection items={tasks} title={"done"} stat={2} />
    </div>

    <CreateNew toggleNew={toggleCreate} isCreateMode={isCreateMode} />
    <EditExist toggleEdit={toggleEdit} isEditMode={isEditMode} currentObj={currentObj} />
   </div>
  </>
 );
};

export default Init;
