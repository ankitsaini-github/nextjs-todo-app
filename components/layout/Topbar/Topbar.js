import classes from "./Topbar.module.css";
import { useRouter } from "next/router";

function Topbar(props) {
  const router=useRouter();
  return (
    <div className={classes.app}>
      <nav className={classes.topbar}>
        <span className={classes.brand}>TODO-APP</span>
        <span className={classes.btngrp}>
          <button className={classes.btn} onClick={()=>{router.push('/')}}>All Task</button>
          <button className={classes.btn} onClick={()=>{router.push('/completed')}}>Completed Task</button>
        </span>
      </nav>
      <div className={classes.maincontent}>
        {props.children}
      </div>
    </div>
  );
}

export default Topbar;
