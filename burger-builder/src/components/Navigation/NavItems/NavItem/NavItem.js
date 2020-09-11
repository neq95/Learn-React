import React from "react";
import {NavLink} from "react-router-dom";

import "./NavItem.css";

const NavItem = props => {
  return (
    <li className="nav-list__item">
      <NavLink 
        to={props.href}
        exact={props.exact}
        className="nav-list__item-link"
      >
        {props.children}
      </NavLink>
    </li>
  )
}

export default NavItem;