import React from "react";
import { Field, Form } from "react-final-form";
import s from "./s.module.css";

const LoginForm = ({onLogin}) => (
  <Form
   initialValues={{remember: true}}
   onSubmit={onLogin}
   render={({ handleSubmit }) => (
    <form onSubmit={handleSubmit} className={s.LoginForm}>
     <label>
      <span className={s.l_title}>Login:</span>
      <Field component="input" type="email" name="login" placeholder="Login" required />
     </label>
     <label>
      <span className={s.l_title}>Password:</span>
      <Field component="input" type="password" name="pass" placeholder="********" required />
     </label>
     <label>
      <Field component="input" type="checkbox" name="remember" />
      <span className={s.l_title}>Remember me</span>
     </label>
     <button type="submit" className={s.btn_sumbit}>Login</button>
    </form>
   )}
  />);

export default LoginForm;
