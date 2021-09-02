import React from "react";
import "./deleteQuiz.scss";
import Auxilary from "../../hoc/auxilary/auxilary";
import Button from "../../components/UI/button/button";
import axios from "axios";

export default class QuizDelete extends React.Component {
  state = {
    quizes: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/quizes.json"
      );

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz №${index + 1}`,
        });
      });
      this.setState({ quizes });
    } catch (e) {
      console.log(e);
    }
  }

  deleteHandler = async (quizId) => {
    try {
      const response = await axios.delete(
        `https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/quizes/${quizId}.json`
      );

      this.rerenderList();
    } catch (e) {
      console.log(e);
    }
  };

  rerenderList = async () => {
    try {
      const response = await axios.get(
        "https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/quizes.json"
      );

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz №${index + 1}`,
        });
      });
      this.setState({ quizes });
    } catch (e) {
      console.log(e);
    }
  };

  renderQuizes() {
    return this.state.quizes.map((quiz, index) => {
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
