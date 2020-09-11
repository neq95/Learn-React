import React from "react";

import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import "./Layout.css";

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  toggleSideDrawerHandler = () => {
    this.setState(state => ({showSideDrawer: !state.showSideDrawer}))
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>
        <SideDrawer 
          showSideDrawer={this.state.showSideDrawer}
          closeClicked={this.toggleSideDrawerHandler}/>
        <main className="content">
          {this.props.children}
        </main>
      </React.Fragment>
    )
  }
}

export default Layout;