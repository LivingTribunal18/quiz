import React from "react";
import ActiveQuiz from "../../components/activeQuiz/activeQuiz";
import FinishedQuiz from "../../components/finishedQuiz/finishedQuiz";
import "./quiz.scss";
import Loader from "../../components/UI/loader/loader";
// import axios from "../../axios/axiosQuiz";

import { connect } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  retryQuiz,
} from "../../store/actions/quiz";

class Quiz extends React.Component {
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.questionId);
  }

  componentWillUnmount() {
    this.props.retryQuiz();
  }

  render() {
    return (
      <div className="quiz">
        <div className="quizWrapper">
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <>
              <h1>Answer the test</h1>
              <ActiveQuiz
                question={this.props.quiz[this.props.activeQuestion]}
                onAnswerClickHandler={this.props.quizAnswerClick}
                quizLength={this.props.quiz.length}
                answerState={this.props.answerState}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: (questionId) => dispatch(fetchQuizById(questionId)),
    quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
