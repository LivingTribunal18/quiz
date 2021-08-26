import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./finishedQuiz.scss";
import Button from "../UI/button/button";

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }

    return total;
  }, 0);

  return (
    <div className="finishedQuiz">
      <ul>
        {props.quiz.map((quizItem) => {
          const classes = [
            "fas",
            props.results[quizItem.id] === "error"
              ? "fa-times errorIcon"
              : "fa-check successIcon",
          ];

          return (
            <li key={uuidv4()}>
              <b>{quizItem.id + 1}.&nbsp;</b>
              {quizItem.question}
              <i className={classes.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Right answers: {successCount} / {props.quiz.length}
      </p>

      <div>
        <Button onClick={props.onRetry} type="primary">
          Retry
        </Button>
        <Link to="/">
          <Button type="success">Test List</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
