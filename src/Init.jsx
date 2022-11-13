import React from "react";
import Aside from "./components/Aside/Aside";
import StatusSection from "./components/StatusSection/StatusSection";

const Init = () => {
 return (
  <div className="app_main">
   <Aside />
   <div className="app_sections">
    <StatusSection />
    <StatusSection />
    <StatusSection />
   </div>
  </div>
 );
};

export default Init;
