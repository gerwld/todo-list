import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {Aside, Loader, LoaderMid, CreateNew, EditExist, SubmitDelete, StatusSection, } from "./components/";
import { logoutTC } from "./redux/reducers/auth-reducer";
import { getTasksTC, setCreatemode, setCurrentSort, setCurrentTags, setDeletemode, setEditmode } from "./redux/reducers/tasks-reducer";

import onlyUnique from "./tools/onlyUnique";

const MainScreen = () => {
 const nav = useNavigate();
 const disp = useDispatch();
 const { currentTag } = useParams();
 const [tagsLoader, setLoad] = useState(false);
 const { isInit, tasks, sortedTasks, tags, isCreateMode, isEditMode, isDeleteMode, pendingDeleteID, currentObj, currentTagSt } = useSelector(
  ({ tasks }) => ({
   isInit: tasks.isInit,
   tasks: tasks.tasks,
   sortedTasks: tasks.sortedTasks,
   tags: tasks.currentTags,
   isCreateMode: tasks.isCreateMode,
   isEditMode: tasks.isEditMode,
   isDeleteMode: tasks.isDeleteMode,
   pendingDeleteID: tasks.pendingDeleteID,
   currentObj: tasks.currentElement,
   currentTagSt: tasks.currentTag,
  })
 );

 const toggleCreate = () => {
  disp(setCreatemode(!isCreateMode));
 };

 const toggleEdit = () => {
  disp(setEditmode(!isEditMode));
 };

 const toggleDelete = () => {
  disp(setDeletemode(!isDeleteMode));
 };

 const onLogout = () => {
  disp(logoutTC());
 };

 useEffect(() => {
  setTimeout(() => {
   disp(getTasksTC());
  }, 200);
 }, []);

 //set sort on link change && isInit
 useEffect(() => {
  if (!currentTag && isInit) disp(setCurrentSort());
  else if (currentTagSt !== currentTag && currentTag) {
   isInit && setLoad(true);
   disp(setCurrentSort(currentTag?.replace(/_/g, " ")));
  }

  //imitate pending for ux flow
  setTimeout(() => setLoad(false), 200);
 }, [currentTag]);

 //update sort
 useEffect(() => {
  if (tasks && isInit) disp(setCurrentSort(currentTag?.replace(/_/g, " ")));
 }, [tasks, isInit]);

 //redirect if empty
 useEffect(() => {
  if (!sortedTasks?.length && isInit) nav("/");
 }, [sortedTasks, currentTag]);

 useEffect(() => {
  if (tasks?.length) {
   let allTags = tasks.map((e) => e.tags).flat(1);
   let uniqueTags = allTags.filter(onlyUnique);
   disp(setCurrentTags(uniqueTags));
  } else if (isInit) {
   disp(setCurrentTags([]));
  }
 }, [tasks]);

 return (
   <div className="app_main">
    <Aside tags={tags} currentTag={currentTagSt} toggleNew={toggleCreate} onLogout={onLogout} isInit={isInit} />
    {tasks?.length ?
     <div className="app_sections">
      <StatusSection items={sortedTasks || tasks} title={"to do"} stat={0} />
      <StatusSection items={sortedTasks || tasks} title={"in-progress"} stat={1} />
      <StatusSection items={sortedTasks || tasks} title={"done"} stat={2} />
     </div>
    : isInit ?
     <div className="no_ts">
      <h1>No tasks yet</h1>
      <p>Be sure to add your first task</p>
      <button onClick={toggleCreate}>Add task</button>
     </div>
    : <Loader />}

    {/* //--- MODALS ---// */}
    <CreateNew toggleNew={toggleCreate} isCreateMode={isCreateMode} />
    <EditExist toggleEdit={toggleEdit} isEditMode={isEditMode} currentObj={currentObj} />
    <SubmitDelete toggleDelete={toggleDelete} isDeleteMode={isDeleteMode} pendingDeleteID={pendingDeleteID} />

    {tagsLoader ? <LoaderMid isPending={true} /> : ""}
   </div>
 );
};

export default MainScreen;
