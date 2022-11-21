import React, { useEffect, useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import s from "./s.module.css";

const TaskForm = ({ onSubmitCB, close, currentObj }) => {
 let tag_input = useRef(null);
 let task_input = useRef(null);
 let [localTags, setTags] = useState([{ id: "dfbdfb", title: "Tag", isChecked: true }]);
 let [localTasks, setTasks] = useState([{ id: "dsvldsv", title: "Subask exm", isChecked: true }]);
 const { globalTags } = useSelector(({ tasks }) => ({
  globalTags: tasks.currentTags,
 }));

 useEffect(() => {
  if (globalTags && currentObj) {
   let objTags = currentObj.tags;
   let allFalse = globalTags.filter((e) => !objTags.includes(e));
   let all = [
    ...allFalse.map((e) => ({ id: uuid(), title: e, isChecked: false })),
    ...objTags.map((e) => ({ id: uuid(), title: e, isChecked: true })),
   ];
   setTags(all);
  }
 }, [currentObj]);

 const onSubmit = (obj, action) => {
  let id = uuid();
  let tags = [...localTags].filter((e) => e.isChecked).map((e) => e.title);
  const newObj = { id, ...obj, tags, subtasks: localTasks, status: Number(obj.status) };
  onSubmitCB(newObj);
  action.reset();
  setTags([]);
  setTasks([]);
  tag_input.current.value = "";
  task_input.current.value = "";
 };

 const onAddLocalTag = () => {
  let id = uuid();
  let val = tag_input.current.value.trim().toLowerCase();
  const isExist = localTags.some((e) => e.title === val);
  if (val && !isExist) {
   setTags([{ id, title: val, isChecked: true }, ...localTags]);
  }
  tag_input.current.value = "";
 };

 const onAddLocalTask = () => {
  let id = uuid();
  let val = task_input.current.value.trim().toLowerCase();
  const isExist = localTasks.some((e) => e.title === val);
  if (val && !isExist) {
   setTasks([{ id, title: val, isChecked: false }, ...localTasks]);
  }
  task_input.current.value = "";
 };

 const toggleSelect = (id, isTask) => {
  let newObj;
  if (isTask) {
   newObj = [...localTasks];
  } else newObj = [...localTags];

  let i = newObj.findIndex((e) => e.id === id);
  newObj[i].isChecked = !newObj[i].isChecked;

  if (isTask) {
   setTasks(newObj);
  } else setTags(newObj);
 };

 const removeTask = (id) => {
  let newObj = [...localTasks].filter((e) => e.id !== id);
  setTasks(newObj);
 };

 return (
  <Form
   onSubmit={onSubmit}
   initialValues={{
    status: "0",
    title: currentObj?.title || "",
    desc: currentObj?.desc || "",
    status: currentObj?.status.toString() || "0",
   }}
   render={({ handleSubmit, form }) => (
    <form onSubmit={handleSubmit} className={s.form}>
     <div className={s.group_1}>
      <label>
       <span className={s.l_title}>Task name:</span>
       <Field component="input" type="text" name="title" placeholder="Go to work..." required />
      </label>
      <label>
       <span className={s.l_title}>Task description:</span>
       <Field component="textarea" name="desc" rows="5" placeholder="At 6 AM " required />
      </label>
      <div className={s.status}>
       <h2>Status:</h2>
       <label>
        <span>To-do</span>
        <Field component="input" type="radio" name="status" value="0" />
       </label>
       <label>
        <span>In-Progress</span>
        <Field component="input" type="radio" name="status" value="1" />
       </label>
       <label>
        <span>Done</span>
        <Field component="input" type="radio" name="status" value="2" />
       </label>
      </div>
     </div>
     <div className={s.group_2}>
      <h2 className={s.tags_title}>Tags:</h2>

      <div className={s.add_elem}>
       <input ref={tag_input} type="text" name="addtag" placeholder="Others" />
       <button onClick={onAddLocalTag} type="button">
        Create
       </button>
      </div>

      <div className={s.tag_list}>
       {localTags.map((e) => (
        <label key={e.id}>
         <input type="checkbox" onChange={() => toggleSelect(e.id)} checked={e.isChecked} name={`tag_${e.title}`} />
         {"  "}
         <span>{e.title}</span>
        </label>
       ))}
       + global tags
      </div>

      <h2>Subtasks:</h2>
      <div className={s.add_elem}>
       <input ref={task_input} type="text" name="addsubtask" placeholder="Others" />
       <button onClick={onAddLocalTask} type="button">
        Create
       </button>
      </div>

      <div className={s.subtasks_list}>
       {localTasks.map((e) => (
        <div key={e.id} className={s.task}>
         <label>
          <input type="checkbox" onChange={() => toggleSelect(e.id, true)} name={e.title} checked={e.isChecked} />
          <span>{e.title}</span>
         </label>
         <button onClick={() => removeTask(e.id)} type="button">
          Delete
         </button>
        </div>
       ))}
      </div>
     </div>

     <div className={s.buttons}>
      <button type="submit">Submit</button>
      <button type="button" onClick={close}>
       Cancel
      </button>
     </div>
    </form>
   )}
  />
 );
};

export default TaskForm;
