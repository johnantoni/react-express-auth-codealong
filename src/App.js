import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import { getToken, setToken } from "./services/tokenService";

class App extends Component {
  state = {
    user: null
  }

  componentDidMount() {
    // When the app loads, try and get the current user
    this.getCurrentUser();
  }

  setUser = user => {
      // Set the current user into state.
      this.setState({ user });
  }

  getCurrentUser = () => {
    // 1. Try and retrieve the user's token
    const token = getToken();
    // 2. If they have a token, make a request to /user/current for their user details
    if (token) {
      axios
          .get("/user/current", {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
          .then(res => {
              if (res.status === 200) {
                  const user = res.data.payload;
                  this.setState({ user });
              }
          });
    }
  }

  render() {
    // 1. Add React-Router to control what view the user sees
    // 2. If there is an active user in state, send them to the dashboard.
    // 3. If there's no user, send them to the login screen.
    // 4. If a logged in user tries to hit the login screen, redirect them to the dashboard.
    return (
      <div className="App">
        <h1>Authentication App</h1>
        <Router>
          <div>

          <Switch>

            <Route
                exact
                path="/login"
                render={() =>
                    this.state.user ? <Redirect to="/" /> : <Login getCurrentUser={this.getCurrentUser} />
                }
            />

            <Route
                exact
                path="/signup"
                render={() =>
                    this.state.user ? (
                    <Redirect to="/" />
                    ) : (
                    <Signup setUser={this.setUser} />
                    )
                }
            />

            <Route
                path="/"
                render={() =>
                    this.state.user ? (
                    <Dashboard setUser={this.setUser} />
                    ) : (
                    <Redirect to="/login" />
                    )
                }
            />

          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

// {(function() {
//   // iffe function
//   // Immediately Invoked Functional Expression
// })()}

// https://github.com/airbnb/react-dates

// https://material-ui-next.com
