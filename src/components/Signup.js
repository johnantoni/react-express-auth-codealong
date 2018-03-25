import React, { Component } from "react";
import axios from "axios"

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
    // 1. Grab email and password out of state
    const { email, password } = this.state;
    // 2. Post them to our backend
    axios
        .post("/auth/signup", {
        email,
        password
        })
        .then(res => {
        if (res.status === 200) {
            const user = res.data.payload;
            // 3. Set the user in state!
            this.props.setUser(user);
        }
        });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            onChange={this.handleChange}
            name="email"
            id="email"
            placeholder="email"
          />
        </div>
        <div>
          <label htmlFor="email">Password: </label>
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            id="password"
            placeholder="Enter your desired password"
          />
        </div>
        <div>
          <input type="submit" value="Signup" />
        </div>
      </form>
    );
  }
}

export default Login;
