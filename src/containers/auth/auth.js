import React from "react";
import "./auth.scss";
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import { validateControl, validateForm } from "../../form/formFramework";
// import isJS from "is_js";
// import axios from "axios";

import { connect } from "react-redux";
import { auth } from "../../store/actions/auth";

class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Enter correct email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Passsword",
        errorMessage: "Enter secure password",
        valid: false,
        touched: false,
        validation: {
          required: true,
          password: true,
          minLength: 6,
        },
      },
    },
  };

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          touched={control.touched}
          valid={control.valid}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={(event) => {
            this.onChangeHandler(event, controlName);
          }}
        />
      );
    });
  }

  render() {
    return (
      <div className="auth">
        <div>
          <h1>Auth</h1>

          <form onSubmit={this.submitHandler} className="auth-form">
            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Log in
            </Button>
            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Registration
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) =>
      dispatch(auth(email, password, isLogin)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
