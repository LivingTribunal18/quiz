import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./answerItem.scss";

const AnswerItem = (props) => {
  const classes = ["answerItem"];

  if (props.answerStateIndex) {
    classes.push(props.answerStateIndex);
  }

  return (
    <li
      key={uuidv4()}
      onClick={() => props.onAnswerClickHandler(props.answer.id)}
      id={props.answer.id}
      className={classes.join(" ")}
    >
      {props.answer.text}
    </li>
  );
};
export default AnswerItem;
