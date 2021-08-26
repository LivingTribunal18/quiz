import React from "react";
import { v4 as uuidv4 } from "uuid";
import AnswersList from "./answersList/answersList";
import "./activeQuiz.scss";

const ActiveQuiz = (props) => {
  // props.question.map((e) => {
  return (
    <div key={uuidv4()} className="activeQuiz">
      <p className="question">
        <span>
          <b>{props.question.id + 1}.&nbsp;</b>
          {props.question.question}
        </span>
        <small>
          {props.question.id + 1} / {props.quizLength}
        </small>
      </p>
      <AnswersList
        answers={props.question.answers}
        onAnswerClickHandler={props.onAnswerClickHandler}
        answerState={props.answerState}
      />
    </div>
  );
  // });
};
export default ActiveQuiz;
