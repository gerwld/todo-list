import React from "react";
import s from "./s.module.css";

const ListElement = ({ id, title, desc, status, tags, subtasks }) => {
 return (
  <article className={s.content}>
   <h2 className={s.title}>{title}</h2>

   <div className={`${s.labels} lables`}>
   {tags?.length
    ? tags.map((tag) => (
        <span  key={id + tag + "_key"}>{tag}</span>
      ))
    : ""}
    </div>

   <p className={s.desc}>{desc}</p>

   <div className={s.sub_tasks}>
   {subtasks?.length ? subtasks.map(e => 
    <label key={e.id} className={s.sub_task}>
     <input type="checkbox" />
     <span>{e.title}</span>
    </label>
   ) : ''}
   </div>

   <div className={s.actions}>
    <button className={s.btn_edit}>Edit</button>
   </div>
  </article>
 );
};

ListElement.defaultProps = {
 id: "unset",
 title: "No title",
 desc: "No description",
 status: 0,
 tags: [],
 subtasks: [],
};

export default ListElement;
