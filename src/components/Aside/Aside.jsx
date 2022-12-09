import React from "react";
import { NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";
import s from "./s.module.css";

const Aside = ({ tags, toggleNew, onLogout, isInit, currentTag }) => {

 return (
  <aside className={s.aside}>
   <button onClick={toggleNew} className={s.btn_create}>Create New Task</button>
   <nav className={s.tags_nav}>
    <h2>Tags:</h2>
    <ul>
     <li className={!currentTag ? s.current : ''}><NavLink to='/'>All</NavLink></li>
     {tags?.length ? 
     tags.map((e) => <li key={`${e}_key`} className={currentTag === e ? s.current : ''}><NavLink to={`/tags/${e.replace(/ /g,"_")}`}>{e}</NavLink></li>) :
      isInit ? 
      <span className={s.all_tags_msg}>All tags displayed.</span> :
      <Loader noMinMax={true}/>}
    </ul>
   </nav>

   <div className={s.log_group}>
    <button type="button" className={s.btn_log} onClick={onLogout}>Log Out</button>
   </div>
  </aside>
 );
};

export default Aside;
