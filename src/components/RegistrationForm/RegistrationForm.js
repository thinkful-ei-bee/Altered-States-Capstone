import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Required, Label } from "../Form/Form";
import AuthApiService from "../../services/auth-api-service";
import Button from "../Button/Button";
import "./RegistrationForm.css";

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { 
    error: null,
    name: '',
    username: '',
    password: '',
  };

  firstInput = React.createRef();

  handleSubmit = (ev) => {

    ev.preventDefault()

    // eslint-disable-next-line
    const REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
    let { name, username, password } = this.state;

    if (!name || !username || !password) {
      this.setState({ error: 'Please fill out all fields' })
      return;
    }

    if (password.length < 7) {
      this.setState({ error: 'Password must be at least 6 characters' })
      return;
    }

    if (password.length > 72) {
      this.setState({ error: 'Password cannot be longer than 72 characters' })
      return;
    }

    if (!REGEX.test(password)) {
      this.setState({ error: 'Password must contain an uppercase and lowercase letter, a number, and a special character' })
      return;
    }

    if (password.startsWith(' ') || password.endsWith(' ')) {
      this.setState({ error: 'Password must not begin or end with spaces' })
      return;
    }

    AuthApiService.postUser({
      name: name,
      username: username,
      password: password
    })
      .then(user => {
        this.setState({ 
          name: '',
          username: '',
          password: ''
        })
        this.props.onRegistrationSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  handleChange = e => { 
    this.setState({ [e.target.name]: e.target.value })
  }

  // <div className='auth-error-container' role="alert">{error && <p className='auth-error'>{error}</p>}</div>

  render() {
    const { error } = this.state;
    return (
      <div className='registration-form'>
        <div className='auth-error-container' role='alert'>{error && error}</div>
        <h2 className='log-reg-header reg-header'>Sign Up</h2>
        <form onSubmit={this.handleSubmit} onChange={event => this.handleChange(event)}>
          <div className="form-label">
            <Label htmlFor="registration-name-input">
              Enter your name
              <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id="registration-name-input"
              name="name"
              required
            />
          </div>
          <div className="form-label">
            <Label htmlFor="registration-username-input">
              Choose a username
              <Required />
            </Label>
            <Input id="registration-username-input" name="username" required />
          </div>
          <div className="form-label">
            <Label htmlFor="registration-password-input">
              Choose a password
              <Required />
            </Label>
            <Input
              id="registration-password-input"
              name="password"
              type="password"
              required
            />
          </div>
          <footer>
            <Button className='registration-button'type="submit">SIGN UP</Button> <br />
            <Link to="/login" className="login-redirect">
              Already have an account?
            </Link>
          </footer>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
