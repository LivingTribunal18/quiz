import React from "react";
import "./deleteQuiz.scss";
import Auxilary from "../../hoc/auxilary/auxilary";
import Button from "../../components/UI/button/button";
// import axios from "axios";

import { connect } from "react-redux";
import { fetchQuizes, deleteQuiz } from "../../store/actions/quiz";

class QuizDelete extends React.Component {
  componentDidMount() {
    this.props.fetchQuizes();
  }

  deleteHandler = (quizId) => {
    this.props.deleteQuiz(quizId);

    const timeout = window.setTimeout(() => {
      this.props.fetchQuizes();
      window.clearTimeout(timeout);
    }, 1000);
  };

  renderQuizes() {
    return this.props.quizes.map((quiz, index) => {
      return (
        <Auxilary key={index + Math.random()}>
          <ul className="quizesList">
            <li>
              {quiz.name}
              <Button
                onClick={() => {
                  this.deleteHandler(quiz.id);
                }}
              >
                Delete
              </Button>
            </li>
          </ul>
        </Auxilary>
      );
    });
  }

  render() {
    return (
      <div className="quizDelete">
        <div>
          <h1>Quiz Delete</h1>
          {this.renderQuizes()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
    deleteQuiz: (quizId) => dispatch(deleteQuiz(quizId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizDelete);
