import React from "react";
import { useSelector } from "react-redux";
import Aside from "./components/Aside/Aside";
import CreateNew from "./components/Modals/CreateNew/CreateNew";
import StatusSection from "./components/StatusSection/StatusSection";

const Init = () => {
 const { tasks } = useSelector(({ tasks }) => ({
  tasks: tasks.tasks,
 }));

 return (
  <>
   <div className="app_main">
    <Aside />
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
