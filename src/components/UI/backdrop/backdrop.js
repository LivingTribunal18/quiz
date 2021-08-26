import React from "react";
import "./backdrop.scss";

const Backdrop = (props) => {
  return <div className="backdrop" onClick={props.onClick}></div>;
};

export default Backdrop;
