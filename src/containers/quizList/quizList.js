import React from "react";
import { NavLink } from "react-router-dom";
import "./quizList.scss";
import Loader from "../../components/UI/loader/loader";
import axios from "axios";

export default class QuizList extends React.Component {
  state = {
    quizes: [],
    loading: true,
  };

  renderQuizes() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const response = await axios.get(
        "https://react-quiz-4d12d-default-rtdb.europe-west1.firebasedatabase.app/quizes.json"
      );
      console.log(response);

      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Quiz №${index + 1}`,
        });
      });

      this.setState({ quizes, loading: false });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="quizList">
        <h1>Test list</h1>
        {this.state.loading ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
      </div>
    );
  }
}
