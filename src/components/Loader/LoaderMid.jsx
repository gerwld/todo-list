import React from "react";
import s from "./s.module.css";

const LoaderMid = ({ isPending = false, isSucess = true }) => {
 return (
  <div className={isPending ? s.midLoader_pending : isSucess ? s.midLoader_success : s.midLoader_error}>
   <div className={s.content_block}>
    <div class={s.content}>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
    </div>
    {!isPending ? 
     <span className={s.mid_msg}>
      {isSucess ?
       <span>Success.</span> :
       <>
        <span>Something went wrong.</span>
        <span>Please try again.</span>
       </>
      }
     </span>
    : ""}
   </div>
  </div>
 );
};

export default LoaderMid;
