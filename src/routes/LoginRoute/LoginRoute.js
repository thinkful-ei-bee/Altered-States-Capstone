import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import Footer from '../../components/Footer/Footer'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
  };

  render() {
    return (
      <section>
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        <Footer/>
      </section>
    );
  }
}

export default LoginRoute;
