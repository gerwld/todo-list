import React from "react";
import ListElement from "../ListElement/ListElement";
import s from "./s.module.css";

const StatusSection = ({ title, stat }) => {
 return (
  <section className={`${s.section} ${stat}_section`}>
   <h1 className={s.title}>{title}</h1>
   <div className={s.content}>
    <ListElement />
   </div>
  </section>
 );
};

export default StatusSection;
