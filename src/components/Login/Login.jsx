import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loginTC, registerTC } from "../../redux/reducers/auth-reducer";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import s from "./s.module.css";

const Login = ({isReg}) => {
 const disp = useDispatch();
 const {error} = useSelector(({init}) => ({
  error: init.currError
 }))
 const onLogin = (res) => {
  disp(loginTC(res));
 }

 const onRegister = (res) => {
  disp(registerTC(res));
 }

 return (
  <div className={s.login_screen}>
   <div className={s.login_block}>
    <h1 className={s.header}>{isReg ? 'Sign Up' : 'Login'}</h1>

    {error?.length ? error : ''}
    
    {isReg ? 
     <RegisterForm onRegister={onRegister} /> :
     <><LoginForm onLogin={onLogin} />
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
