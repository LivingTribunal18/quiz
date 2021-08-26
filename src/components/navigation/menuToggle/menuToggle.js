import React from "react";
import "./menuToggle.scss";

const MenuToggle = (props) => {
  const classes = ["menuToggle", "fas"];
  if (props.isOpen) {
    classes.push("fa-times");
    classes.push("open");
  } else {
    classes.push("fa-bars");
  }

  return <i className={classes.join(" ")} onClick={props.onToggle}></i>;
};

export default MenuToggle;
