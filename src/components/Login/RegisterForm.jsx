import React from "react";
import { Field, Form } from "react-final-form";
import s from "./s.module.css";

const onSubmit = () => {};

const RegisterForm = () => (
  <Form
   initialValues={{remember: true}}
   onSubmit={onSubmit}
   render={({ handleSubmit }) => (
    <form onSubmit={handleSubmit} className={s.LoginForm}>
     <label>
      <span className={s.l_title}>Login:</span>
      <Field component="input" type="text" name="login" placeholder="Login" required />
     </label>
     <label>
      <span className={s.l_title}>Password:</span>
      <Field component="input" type="password" name="pass" placeholder="********" required />
     </label>
     <label>
      <span className={s.l_title}>Repeat password:</span>
      <Field component="input" type="password" name="rep-pass" placeholder="********" required />
     </label>
     <label>
      <Field component="input" type="checkbox" name="remember" required />
      <span className={s.l_title}>Agree with agreement and agreement agreed</span>
     </label>
     <button type="submit" className={s.btn_sumbit}>Sign Up</button>
    </form>
   )}
  />);

export default RegisterForm;
