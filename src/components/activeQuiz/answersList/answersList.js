import React from "react";
import AnswerItem from "./answerItem/answerItem";
import { v4 as uuidv4 } from "uuid";
import "./answersList.scss";

const AnswersList = (props) => {
  return (
    <ul className="answersList">
      {props.answers.map((answer) => {
        return (
          <AnswerItem
            key={uuidv4()}
            answer={answer}
            onAnswerClickHandler={props.onAnswerClickHandler}
            answerStateIndex={
              props.answerState ? props.answerState[answer.id] : null
            }
          />
        );
      })}
    </ul>
  );
};

export default AnswersList;
