import React from "react";

import NavItem from "./NavItem/NavItem";

import "./NavItems.css";

let items = [
  {href:"/", text: "Burger Builder"},
  {href:"/orders", text: "Orders"},
]

const NavItems = () => {
  let navItems = items.map((el) => {
    return (
    <NavItem 
      key={el.text} 
      href={el.href}
      exact
    >
      {el.text}
    </NavItem>
    )
  });
  return (
    <ul className="nav-list">
      {navItems}
    </ul>
  )
}

export default NavItems;