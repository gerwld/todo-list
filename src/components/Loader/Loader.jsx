import React from "react";
import s from "./s.module.css";

const Loader = () => (
 <div className={s.loader}>
  <div className={s.lds_ripple}>
   <div></div>
   <div></div>
  </div>
 </div>
);

export default Loader;
