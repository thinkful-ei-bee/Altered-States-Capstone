import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.css'
import NewEntryRoute from '../../routes/NewEntryRoute/NewEntryRoute';
import EntryRoute from '../../routes/EntryRoute/EntryRoute';
import TrendRoute from '../../routes/TrendRoute/TrendRoute';
import Footer from '../Footer/Footer'
import LandingPageRoute from '../../routes/LandingPageRoute/LandingPageRoute';


export default class App extends Component {
  state = { 
    hasError: false,
    newEntry:false,
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }


  render() {


    const { hasError } = this.state
    return (
      <div className='App'>
        <Header />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
            />
            <PrivateRoute
              path={'/entry/:id/:origin'}
              component={EntryRoute}
            />
            <PrivateRoute
              exact
              path={'/new'}
              component={NewEntryRoute} />
            <PrivateRoute
              exact
              path={'/trends'}
              component={TrendRoute}
            />
            <PublicOnlyRoute
              path={'/landing'}
              component={LandingPageRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
        <Switch>
        <Route exact path='/' component={Footer}/>
        <Route path='/landing' component={Footer}/>
        <Route path='/login' component={Footer}/>
        <Route path='/register' component={Footer}/>
        <Route path='/trends' component={Footer}/>
        <Route path='/entry' component={Footer}/>

        </Switch>
      </div>
    );
  }
}
