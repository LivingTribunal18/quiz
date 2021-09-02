import React from "react";
import { NavLink } from "react-router-dom";
import "./drawer.scss";
import Backdrop from "../../UI/backdrop/backdrop";

class Drawer extends React.Component {
  renderLinks(links) {
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

    const links = [
      {
        to: "/",
        label: "Quiz List",
        exact: true,
      },
    ];

    if (this.props.isAuthenticated) {
      links.push({
        to: "/quiz-creator",
        label: "Create Quiz",
        exact: false,
      });
      links.push({
        to: "/logout",
        label: "Logout",
        exact: false,
      });
      links.push({
        to: "/quiz-delete",
        label: "Delete Quiz",
        exact: false,
      });
    } else {
      links.push({
        to: "/auth",
        label: "Authorization",
        exact: false,
      });
    }

    return (
      <>
        <nav className={classes.join(" ")}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
