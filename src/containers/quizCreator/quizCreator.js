import React from "react";
import "./quizCreator.scss";
import {
  createControl,
  validateControl,
  validateForm,
} from "../../form/formFramework";
import Auxilary from "../../hoc/auxilary/auxilary";
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import Select from "../../components/UI/select/select";
import axios from "axios";

import { connect } from "react-redux";
import {
  createQuizQuestion,
  finishCreateQuiz,
} from "../../store/actions/create";

function createOptionControls(num) {
  return createControl(
    {
      label: `Option ${num}`,
      errorMessage: "Create option",
      id: num,
      type: "text",
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Input question",
        errorMessage: "Field cant be empty",
        type: "text",
      },
      { required: true }
    ),
    option1: createOptionControls(1),
    option2: createOptionControls(2),
    option3: createOptionControls(3),
    option4: createOptionControls(4),
  };
}

class QuizCreator extends React.Component {
  state = {
    formControls: createFormControls(),
    rightAnswerId: 1,
    isFormValid: false,
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  addQuestionHandler = (event) => {
    event.preventDefault();

    const { question, option1, option2, option3, option4 } =
      this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false,
    });
  };

  createQuizHandler = (event) => {
    event.preventDefault();

    this.setState({
      formControls: createFormControls(),
      rightAnswerId: 1,
      isFormValid: false,
    });

    this.props.finishCreateQuiz();
  };

  changeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = event.target.value;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxilary key={index + controlName}>
          <Input
            type={control.type}
            value={control.value}
            touched={control.touched}
            valid={control.valid}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={(event) => {
              this.changeHandler(event, controlName);
            }}
          />
          {index === 0 ? <hr /> : null}
        </Auxilary>
      );
    });
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: Number(event.target.value),
    });
  };

  render() {
    return (
      <div className="quizCreator">
        <div>
          <h1>Quiz Creator</h1>

          <form onSubmit={this.submitHandler}>
            {this.renderControls()}
            <Select
              label="Choose right answer"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: "1", value: 1 },
                { text: "2", value: 2 },
                { text: "3", value: 3 },
                { text: "4", value: 4 },
              ]}
            />
            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Add question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Create test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quiz: state.create.quiz,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
