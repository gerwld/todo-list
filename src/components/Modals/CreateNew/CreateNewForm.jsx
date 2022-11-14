import React, { useRef, useState } from "react";
import { Form, Field } from "react-final-form";
import { v4 as uuid } from "uuid";

const onSubmit = async (obj) => {
 window.alert(JSON.stringify(obj, 0, 2));
};

const CreateNewForm = () => {
 let tag_input = useRef(null);
 let task_input = useRef(null);
 let [localTags, setTags] = useState([{ id: "dsvdsv", title: "Tag", isChecked: true }]);
 let [localTasks, setTasks] = useState([{ id: "dsvldsv", title: "Subask exm", isChecked: true }]);

 const onAddLocalTag = () => {
  let id = uuid();
  let val = tag_input.current.value.trim();
  const isExist = localTags.some((e) => e.title === val);
  if (val && !isExist) {
   setTags([{ id, title: val, isChecked: true }, ...localTags]);
  }
  tag_input.current.value = "";
 };

 const onAddLocalTask = () => {
  let id = uuid();
  let val = task_input.current.value.trim();
  const isExist = localTasks.some((e) => e.title === val);
  if (val && !isExist) {
   setTasks([{ id, title: val, isChecked: false }, ...localTasks]);
  }
  task_input.current.value = "";
 };

 const toggleSelect = (id, isTask) => {
  let newObj;
  if(isTask) {
   newObj = [...localTasks];
  } else newObj = [...localTags];

  let i = newObj.findIndex((e) => e.id === id);
  newObj[i].isChecked = !newObj[i].isChecked;

  if(isTask) {
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
   initialValues={{ status: "0", employed: false }}
   render={({ handleSubmit, form, submitting, pristine, values }) => (
    <form onSubmit={handleSubmit}>
     <label>
      <span>Task name:</span>
      <Field component="input" type="text" name="title" placeholder="Go to work..." />
     </label>
     <label>
      <span>Task description:</span>
      <Field component="textarea" name="desc" rows="5" placeholder="At 6 AM " />
     </label>

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

     <h2>Tags:</h2>

     <input ref={tag_input} type="text" name="addtag" placeholder="Others" />
     <button onClick={onAddLocalTag} type="button">
      Create
     </button>

     <div className="tag_list">
      {localTags.map((e) => (
       <label key={e.id}>
        <input type="checkbox" onChange={() => toggleSelect(e.id)} checked={e.isChecked} name={`tag_${e.title}`} />
        {"  "}
        {e.title}
       </label>
      ))}
      + global tags
     </div>

     <h2>Subtasks:</h2>
     <input ref={task_input} type="text" name="addsubtask" placeholder="Others" />
     <button onClick={onAddLocalTask} type="button">
      Create
     </button>

     <div className="subtasks_list">
      {localTasks.map((e) => (
       <div key={e.id} className="task">
        <label>
         <input type="checkbox" onChange={() => toggleSelect(e.id, true)} name={e.title} checked={e.isChecked} /> {e.title}
        </label>
        <button onClick={() => removeTask(e.id)} type="button">
         Delete
        </button>
       </div>
      ))}
      + global tasks
     </div>

     <div className="buttons">
      <button type="submit" disabled={submitting || pristine}>
       Submit
      </button>
      <button type="button" onClick={form.reset} disabled={submitting || pristine}>
       Reset
      </button>
     </div>
     <pre>{JSON.stringify(values, 0, 2)}</pre>
    </form>
   )}
  />
 );
};

export default CreateNewForm;
