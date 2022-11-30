import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import s from "./s.module.css";

const Login = () => {
 let isLogin = true;
 return (
  <div className={s.login_screen}>
   <div className={s.login_block}>
    <h1 className={s.header}>{isLogin ? 'Login' : 'Sign Up'}</h1>
    
    {!isLogin ? 
     <RegisterForm />:
     <><LoginForm />
     <div className={s.links}>
      <NavLink to="forgot-password">Forgot password?</NavLink>
      <span>Not a member? <NavLink to="sign-up">Sign Up</NavLink></span>
     </div></>
    }
   </div>
  </div>
 );
};

export default Login;
