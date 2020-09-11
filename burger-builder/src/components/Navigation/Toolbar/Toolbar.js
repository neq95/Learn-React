import React from "react";
import {Link} from "react-router-dom";

import Logo from "../../UI/Logo/Logo";
import NavItems from "../NavItems/NavItems";
import PropTypes from "prop-types"

import "./Toolbar.css";

const Toolbar = props => {
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div 
        className="header__menu header-menu"
        onClick={props.toggleSideDrawer}
      >
        <div className="header-menu__burger"></div>
      </div>
      <nav className="header__nav forDesktop">
        <NavItems />
      </nav>
    </header>
  )
}

export default Toolbar;

Toolbar.propTypes = {
  toggleSideDrawer: PropTypes.func
}
