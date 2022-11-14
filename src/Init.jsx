import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aside from "./components/Aside/Aside";
import CreateNew from "./components/Modals/CreateNew/CreateNew";
import StatusSection from "./components/StatusSection/StatusSection";
import { setCurrentTags } from "./redux/reducers/tasks-reducer";
import onlyUnique from "./tools/onlyUnique";

const Init = () => {
 const disp = useDispatch();
 const { tasks, tags } = useSelector(({ tasks }) => ({
  tasks: tasks.tasks,
  tags: tasks.currentTags
 }));

 useEffect(() => {
  let allTags = tasks.map((e) => e.tags).flat(1);
  let uniqueTags = allTags.filter(onlyUnique);
  disp(setCurrentTags(uniqueTags));
 }, [tasks]);

 return (
  <>
   <div className="app_main">
    <Aside tags={tags}/>
    <div className="app_sections">
     <StatusSection items={tasks} title={"to do"} stat={0} />
     <StatusSection items={tasks} title={"in-progress"} stat={1} />
     <StatusSection items={tasks} title={"done"} stat={2} />
    </div>

    <CreateNew />
   </div>
  </>
 );
};

export default Init;
