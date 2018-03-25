import React, { Component } from "react";
import axios from "axios";
import { getToken, setToken } from "../services/tokenService";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    axios
        // 1. POST to /auth/login, passing in the email and password in the body
        .post("/auth/login", {
          email,
          password
        })
        .then(res => {
          if (res.status === 200) {
              // 2. If we receive a successful response:
              //  - grab the token from the response
              const token = res.data.payload;
              //  - store it in local storage
              setToken(token);
              this.props.getCurrentUser();
          }
        });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="login-email">Email: </label>
          <input
            type="email"
            onChange={this.handleChange}
            name="email"
            id="login-email"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="login-password">Password: </label>
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            id="login-password"
            placeholder="Enter your desired password"
          />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default Login;
