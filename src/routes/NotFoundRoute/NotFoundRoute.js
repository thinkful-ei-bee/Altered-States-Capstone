import React, { Component } from 'react'
import './NotFoundRoute.css';
import verySad from '../../images/verySad.png'

class NotFoundRoute extends Component {
  render() {
    return (
      <section className='not-found'>
        <img src={verySad} alt='verySad' />
        <h2>404 - Page not found</h2>
        <p>Try going back to the previous page.</p>
      </section>
    );
  }
}

export default NotFoundRoute
