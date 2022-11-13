import React from "react";
import s from "./s.module.css";

const StatusSection = ({title, stat}) => {
 return (
  <section className={s.section}>
   <h1 className={`${s.title} ${stat}_header`}>{title}</h1>
   <div className={s.content}>StatusSection</div>
  </section>
 );
};

export default StatusSection;
