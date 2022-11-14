import React, { useEffect, useState } from "react";
import ListElement from "../ListElement/ListElement";
import s from "./s.module.css";

const StatusSection = ({ title, stat, items }) => {
 const [tasks, setTasks] = useState(null);

 useEffect(() => {
  let arr = items.filter(e => e.status === stat);
  setTasks(arr);
 }, [items]);


 return (
  <section className={`${s.section} section_${stat}`}>
   <h1 className={s.title}>{title}</h1>
   <div className={s.content}>
   {tasks?.length ? tasks.map(e => <ListElement key={e.id} />) : 'No items'}
   </div>
  </section>
 );
};

export default StatusSection;
