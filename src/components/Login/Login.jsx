import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import s from "./s.module.css";

const Login = () => {
 return (
  <div className={s.login_screen}>
   <div className={s.login_block}>
    <h1 className={s.header}>Login</h1>
    <LoginForm />

    <div className={s.links}>
     <NavLink to="forgot-password">Forgot password?</NavLink>
     <span>Not a member? <NavLink to="sign-up">Sign Up</NavLink></span>
    </div>
   </div>
  </div>
 );
};

export default Login;
