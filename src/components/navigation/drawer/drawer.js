import React from "react";
import { NavLink } from "react-router-dom";
import "./drawer.scss";
import Backdrop from "../../UI/backdrop/backdrop";

const links = [
  {
    to: "/",
    label: "Quiz List",
    exact: true,
  },
  {
    to: "/auth",
    label: "Authorization",
    exact: false,
  },
  {
    to: "/quiz-creator",
    label: "Create Quiz",
    exact: false,
  },
];

class Drawer extends React.Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName="active"
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const classes = ["drawer"];
    if (!this.props.isOpen) {
      classes.push("close");
    }

    return (
      <>
        <nav className={classes.join(" ")}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
