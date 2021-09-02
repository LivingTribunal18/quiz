import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout/layout";
import Quiz from "./containers/quiz/quiz";
import QuizCreator from "./containers/quizCreator/quizCreator";
import DeleteQuiz from "./containers/deleteQuiz/deleteQuiz";
import QuizList from "./containers/quizList/quizList";
import Auth from "./containers/auth/auth";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz-delete" component={DeleteQuiz} />
          <Route path="/quiz/:questionId" component={Quiz} />
          <Route exact path="/" component={QuizList} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
