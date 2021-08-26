import React from "react";
import "./auth.scss";
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import { validateControl, validateForm } from "../../form/formFramework";
// import isJS from "is_js";
import axios from "axios";

export default class Auth extends React.Component {
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

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyBjSKochPdm-SBzm4asDdX-K2y6VEZhS3Q",
        authData
      );

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyBjSKochPdm-SBzm4asDdX-K2y6VEZhS3Q",
        authData
      );

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
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
            {/* <Input label="Email" inputType="email" required />
            <Input label="Password" inputType="password" required /> */}

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
