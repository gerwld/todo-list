import React from "react";
import s from "./s.module.css";

const Aside = ({ tags, toggleNew, onLogout }) => {
 return (
  <aside className={s.aside}>
   <button onClick={toggleNew} className={s.btn_create}>Create New Task</button>
   <nav className={s.tags_nav}>
    <h2>Tags:</h2>
    <ul>
     <li className={s.current}>All</li>
     {tags?.length ? tags.map((e) => <li key={`${e}_key`}>{e}</li>) : "No tags added."}
    </ul>
   </nav>

   <div className={s.log_group}>
    <button type="button" className={s.btn_log} onClick={onLogout}>Log Out</button>
   </div>
  </aside>
 );
};

export default Aside;
