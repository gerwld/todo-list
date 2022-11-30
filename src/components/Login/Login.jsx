import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import s from "./s.module.css";

const Login = ({isReg}) => {
 return (
  <div className={s.login_screen}>
   <div className={s.login_block}>
    <h1 className={s.header}>{isReg ? 'Sign Up' : 'Login'}</h1>
    
    {isReg ? 
     <RegisterForm />:
     <><LoginForm />
     <div className={s.links}>
      <a href="https://youtu.be/Sv8LHpezbLw" target='_blank'>Forgot password?</a>
      <span>Not a member? <NavLink to="/sign-up">Sign Up</NavLink></span>
     </div></>
    }
   </div>
  </div>
 );
};

export default Login;
