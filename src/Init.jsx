import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aside from "./components/Aside/Aside";
import CreateNew from "./components/Modals/CreateNew/CreateNew";
import StatusSection from "./components/StatusSection/StatusSection";
import { setCreatemode, setCurrentTags } from "./redux/reducers/tasks-reducer";
import onlyUnique from "./tools/onlyUnique";

const Init = () => {
 const disp = useDispatch();
 const { tasks, tags, isCreateMode } = useSelector(({ tasks }) => ({
  tasks: tasks.tasks,
  tags: tasks.currentTags,
  isCreateMode: tasks.isCreateMode
 }));

 const toggleCreate = () => {
  disp(setCreatemode(!isCreateMode));
 }

 useEffect(() => {
  if(tasks?.length) {
   let allTags = tasks.map((e) => e.tags).flat(1);
   let uniqueTags = allTags.filter(onlyUnique);
   disp(setCurrentTags(uniqueTags));
  }
 }, [tasks]);

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
   </div>
  </>
 );
};

export default Init;
