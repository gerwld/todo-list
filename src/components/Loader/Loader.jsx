import React from "react";
import s from "./s.module.css";

const Loader = ({noMinMax}) => (
 <div className={`${s.loader} ${noMinMax ? s.noMinMax : ''}`}>
  <div className={s.lds_ripple}>
   <div></div>
   <div></div>
  </div>
 </div>
);

export default Loader;
