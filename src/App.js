import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import Layout from "./hoc/layout/layout";
import Quiz from "./containers/quiz/quiz";
import QuizCreator from "./containers/quizCreator/quizCreator";
import QuizList from "./containers/quizList/quizList";
import Auth from "./containers/auth/auth";
import Logout from "./components/logout/logout";

import { connect } from "react-redux";
import { autoLogin } from "./store/actions/auth";

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/quiz/:questionId" component={Quiz} />
        <Route exact path="/" component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:questionId" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
