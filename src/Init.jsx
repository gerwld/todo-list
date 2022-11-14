import React from "react";
import Aside from "./components/Aside/Aside";
import CreateNew from "./components/Modals/CreateNew/CreateNew";
import StatusSection from "./components/StatusSection/StatusSection";

const Init = () => {
 return (
  <>
   <div className="app_main">
    <Aside />
    <div className="app_sections">
     <StatusSection title={"to do"} stat={"todo"} />
     <StatusSection title={"in-progress"} stat={"prog"} />
     <StatusSection title={"done"} stat={"done"} />
    </div>

    <CreateNew />
   </div>
  </>
 );
};

export default Init;
