import React from "react";
import s from "./s.module.css";

const Loader = () => (
 <div className={s.loader}>
  <div class={s.lds_ripple}>
   <div></div>
   <div></div>
  </div>
 </div>
);

export default Loader;
