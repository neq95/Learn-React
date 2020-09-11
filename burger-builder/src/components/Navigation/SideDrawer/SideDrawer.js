import React from "react";

import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

import "./SideDrawer.css";

const SideDrawer = props => {
  let sideDrawerClass = "side-drawer closed";
  if(props.showSideDrawer) {
    sideDrawerClass = "side-drawer open";
  }

  return (
    <React.Fragment>
      <Backdrop 
        show={props.showSideDrawer}
        clicked={props.closeClicked}/>
      <div className={sideDrawerClass}>
        <div className="side-drawer__logo">
          <Logo/>
        </div>
        <nav>
          <NavItems />
        </nav>
        <button 
          className="side-drawer__close-button"
          onClick={props.closeClicked}>X</button>
      </div>
    </React.Fragment>
  )
}

export default SideDrawer;