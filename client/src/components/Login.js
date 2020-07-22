import React, { Component } from "react";
import { Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {loginUser} from '../actions/authActions'
import PropTypes from 'prop-types';
import form from "../modules/form/form.module.css";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  formSubmit = async (e) => {
    e.preventDefault();
    this.props.loginUser(e);
    

  }

  render() {
    return (
      <form
      className={form.loginForm}
        onSubmit={(e) => {
          this.formSubmit(e);
        }}
      >
        <h1>Login</h1>
        <input className={form.textInput} type="text" name="username" placeholder="username" />
        <input className={form.textInput} type="text" name="password" placeholder="password" />
        <button className={form.btnPrimary}>Login</button>
      </form>
    );
  }
}

Login.propTypes = {
  loginUser : PropTypes.func.isRequired
}

export default connect(null, {loginUser})(Login);
