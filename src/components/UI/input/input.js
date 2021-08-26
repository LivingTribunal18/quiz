import React from "react";
import "./input.scss";

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

const Input = (props) => {
  const htmlFor = `${props.type || "text"}-${Math.random()}`;
  const cls = ["input"];

  if (isInvalid(props)) {
    cls.push("invalid");
  }

  return (
    <div className={cls.join(" ")}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={props.type || "text"}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {isInvalid(props) ? (
        <span>{props.errorMessage || "Check your password and email"}</span>
      ) : null}
    </div>
  );
};

export default Input;
