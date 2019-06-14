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
      <Link
        onClick={this.handleLogoutClick}
        to='/login'>
        Logout
      </Link>
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

  renderTrendsLink() {
    return TokenService.hasAuthToken()
    ? <Link to='/trends'>Trends</Link>
    : ''
  }

  renderDashboardLink() {
    return TokenService.hasAuthToken()
      ? <Link to='/'>Dashboard</Link>
      : ''
  }

  renderGreeting() {
    return TokenService.hasAuthToken()
    ? <p>Hi {this.context.user.name}!</p>
    : ''
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
          <div className='nav-links'>
            <nav>
              {this.renderGreeting()}
              {this.renderDashboardLink()}
              {this.renderTrendsLink()}
              {TokenService.hasAuthToken()
              ? this.renderLogoutLink()
              : this.renderLoginLink()}
            </nav>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header