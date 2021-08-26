import React from "react";
import ActiveQuiz from "../../components/activeQuiz/activeQuiz";
import FinishedQuiz from "../../components/finishedQuiz/finishedQuiz";
import "./quiz.scss";
import Loader from "../../components/UI/loader/loader";
import axios from "../../axios/axiosQuiz";

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    loading: true,
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const activeIssue = this.state.quiz[this.state.activeQuestion];

    const results = this.state.results;
    if (!results[activeIssue.id]) {
      results[activeIssue.id] = "success";
    }

    if (answerId === activeIssue.rightAnswerId) {
      this.setState({
        answerState: {
          [answerId]: "success",
          idLi: answerId,
        },
        results: results,
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          let nextQuestion = Number(this.state.activeQuestion) + 1;
          this.setState({
            activeQuestion: nextQuestion,
            answerState: null,
          });
        }

        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[activeIssue.id] = "error";

      this.setState({
        answerState: {
          [answerId]: "error",
          idLi: answerId,
        },
        results: results,
      });
    }
  };

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        `/quizes/${this.props.match.params.questionId}.json`
      );
      console.log(response);

      const quiz = response.data;
      this.setState({ quiz, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="quiz">
        <div className="quizWrapper">
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <>
              <h1>Answer the test</h1>
              <ActiveQuiz
                question={this.state.quiz[this.state.activeQuestion]}
                onAnswerClickHandler={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerState={this.state.answerState}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
