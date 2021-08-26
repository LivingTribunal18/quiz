import React from "react";
import "./loader.scss";

const Loader = () => {
  return (
    <div className="loader-center">
      <div className="lds-facebook">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
