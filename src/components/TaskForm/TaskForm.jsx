import React, { useEffect, useRef, useState } from "react";
import { Field, Form } from "react-final-form";
import { useSelector } from "react-redux";
import s from "./s.module.css";

import { toTitleCase, toSentenceCase } from "../../tools/";
import { v4 as uuid } from "uuid";

const TaskForm = ({ onSubmitCB, close, currentObj }) => {
 let tag_input = useRef(null), task_input = useRef(null), resetForm;
 let [localTags, setTags] = useState([]);
 let [localTasks, setTasks] = useState([]);
 const { globalTags, isPending, isEditMode, isCreateMode} = useSelector(({ tasks }) => ({
  isPending: tasks.isSubmitPending,
  globalTags: tasks.currentTags,
  isEditMode: tasks.isEditMode,
  isCreateMode: tasks.isCreateMode
 }));

 const onSubmit = (obj) => {
  let tags = [...localTags].filter((e) => e.checked).map((e) => e.title);
  const newObj = {
   ...obj,
   tags,
   title: toTitleCase(obj?.title || ''),
   desc: toSentenceCase(obj?.desc || ''),
   subtasks: localTasks,
   status: Number(obj.status),
  };
  if (currentObj?.id) newObj.id = currentObj.id;
  onSubmitCB(newObj);
 };

 const onAddLocalTag = () => {
  let val = tag_input.current.value.trim().toLowerCase();
  const isExist = localTags.some((e) => e.title === val);
  if (val && !isExist) {
   setTags([{ id: uuid(), title: val, checked: true }, ...localTags]);
  }
  tag_input.current.value = "";
 };

 const onAddLocalTask = () => {
  let val = task_input.current.value.trim().toLowerCase();
  const isExist = localTasks.some((e) => e.title === val);
  if (val && !isExist) {
   setTasks([{ id: uuid(), title: val, checked: false }, ...localTasks]);
  }
  task_input.current.value = "";
 };

 const toggleSelect = (id, isTask) => {
  let newObj;
  if (isTask) {
   newObj = [...localTasks];
  } else newObj = [...localTags];

  let i = newObj.findIndex((e) => e.id === id);
  newObj[i] = {...newObj[i], checked: !newObj[i].checked};
  if (isTask) {
   setTasks(newObj);
  } else setTags(newObj);
 };

 const removeTask = (id) => {
  let newObj = [...localTasks].filter((e) => e.id !== id);
  setTasks(newObj);
 };


//  SIDE EFFECTS

useEffect(() => {
  //form reset after submit
  if(resetForm && !isPending) {
    resetForm();
    tag_input.current.value = "";
    task_input.current.value = "";
  }
 }, [resetForm, isPending])

 useEffect(() => {
  if (globalTags && currentObj) {
   let objTags = currentObj.tags;
   let allFalse = globalTags.filter((e) => !objTags.includes(e));
   let all = [
    ...allFalse.map((e) => ({ id: uuid(), title: e, checked: false })),
    ...objTags.map((e) => ({ id: uuid(), title: e, checked: true })),
   ];
   setTags(all);
  }
 }, [currentObj]);

 useEffect(() => {
  if(currentObj?.subtasks.length && isEditMode) {
    setTasks([...currentObj.subtasks]);
  } else if(!isCreateMode) setTasks([]);
 }, [currentObj, isCreateMode]);

 useEffect(() => {
    setTags(globalTags?.map((e) => ({ id: uuid(), title: e, checked: false })));
 }, [globalTags]);

 return (
  <Form
  onSubmit={onSubmit}
   initialValues={{
    title: currentObj?.title || "",
    desc: currentObj?.desc || "",
    status: currentObj?.status.toString() || "0",
   }}
   render={({ handleSubmit, form }) => {
    resetForm = form.reset;
    return (
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
          <Field component="input" type="radio" name="status" value="0" />
          <span>To-do</span>
         </label>
         <label>
          <Field component="input" type="radio" name="status" value="1" />
          <span>In-Progress</span>
         </label>
         <label>
          <Field component="input" type="radio" name="status" value="2" />
          <span>Done</span>
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
         {localTags?.map((e) => (
          <label key={e.id}>
           <input type="checkbox" onChange={() => toggleSelect(e.id)} checked={e.checked} name={`tag_${e.title}`} />
           {"  "}
           <span>{e.title}</span>
          </label>
         ))}
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
            <input type="checkbox" onChange={() => toggleSelect(e.id, true)} name={e.title} checked={e.checked} />
            <span>{e.title}</span>
           </label>
           <button onClick={() => removeTask(e.id)} type="button">
            Delete
           </button>
          </div>
         ))}
        </div>
       </div>
       {isPending ? <span className={s.pending}>Pending...</span> : ""}
       <div className={s.buttons}>
        <button type="submit">Submit</button>
        <button type="button" onClick={close}>
         Cancel
        </button>
       </div>
      </form>
     )
   }}
  />
 );
};

export default TaskForm;
