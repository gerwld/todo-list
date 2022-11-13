import React from "react";
import s from "./s.module.css";

const ListElement = () => {
 return (
  <article className={s.content}>
   <h2 className={s.title}>Task title</h2>

   <div className={`${s.labels} lables`}>
    <span>Some fancy lable</span>
   </div>

   <p className={s.desc}>Task desc</p>

   <div className={s.sub_tasks}>
    <label className={s.sub_task}>
     <input type="checkbox" />
     <span>Subtask 1</span>
    </label>
    <label className={s.sub_task}>
     <input type="checkbox" />
     <span>Subtask 2</span>
    </label>
   </div>

   <div className={s.actions}>
    <button className={s.btn_edit}>Edit</button>
   </div>
  </article>
 );
};

export default ListElement;
