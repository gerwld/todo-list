import React from "react";
import s from "./s.module.css";

const Aside = ({ tags }) => {
 return (
  <aside className={s.aside}>
    <button className={s.btn_create}>Create New Task</button>
    <nav className={s.tags_nav}>
      {tags?.length ? tags.map((e) => <li key={`${e}_key`}>{e}</li>) : "No tags added."}
    </nav>
  </aside>
 );
};

export default Aside;
