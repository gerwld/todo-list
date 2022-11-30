import React from "react";
import { Field, Form } from "react-final-form";
import s from "./s.module.css";

const onSubmit = () => {};

const LoginForm = () => (
  <Form
   initialValues={{remember: true}}
   onSubmit={onSubmit}
   render={({ handleSubmit }) => (
    <form onSubmit={handleSubmit} className={s.LoginForm}>
     <label>
      <span className={s.l_title}>Login:</span>
      <Field component="input" type="text" name="title" placeholder="Login" required />
     </label>
     <label>
      <span className={s.l_title}>Password:</span>
      <Field component="input" type="password" name="title" placeholder="********" required />
     </label>
     <label>
      <Field component="input" type="checkbox" name="remember" required />
      <span className={s.l_title}>Remember me</span>
     </label>
     <button type="submit" className={s.btn_sumbit}>Login</button>
    </form>
   )}
  />);

export default LoginForm;
