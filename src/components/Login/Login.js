import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions";


import "./login.css";

import BenshadaForm from "../BenshadaForm/BenshadaForm";

class Login extends React.Component {
  onSubmit = formValues => this.props.login(formValues)

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100">
          <div className="col col-md-3 col-lg-6 d-none d-md-block h-100 login-left" />
          <div className="col col-md-9 col-lg-6">
            <h3 className="mb-2 text-center pt-5">Login to Benshada Place</h3>
            <p className="lead mb-4 text-center">
              Or return{" "}
              <Link className="text-primary" to="/">
                home
              </Link>
            </p>

            <BenshadaForm onSubmitForm={this.onSubmit} className="form px-4 px-md-5 mx-md-3" btn="Login" />

            <p className="text-muted text-left px-4 px-md-5 mx-md-3 my-3">
              New to Benshada?
              <br />
              <Link to="/register">Register</Link>
            </p>
            {/* <p className="text-center my-3">
            <Link to="#" className="text-primary">Forgot password or email?</Link>
          </p> */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {login})(Login);
