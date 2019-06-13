import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='logout-link'>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
        <span className='logged-user'>
          {this.context.user.name}
        </span>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Sign up</Link>
      </div>
    )
  }

  render() {
    console.log(this.context.user)
    return (
      <header className='main-header'>
        <nav>
          <h1>
            <Link to='/'>
              miMood
            </Link>
          </h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </nav>
      </header>
    );
  }
}

export default Header