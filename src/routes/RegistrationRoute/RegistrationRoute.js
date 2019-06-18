import React, { Component } from "react";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import happy from '../../images/happy.png'

class RegistrationRoute extends Component {
  state = {
    newUser: true
  }

  static defaultProps = {
    history: {
      push: () => {},
    }
  };

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <section>
          {this.state.newUser && <div className='tutorial-container'>
            <div className='onboard-header'>
              <span>miMood</span>
              <span className='journal'>journal</span>
            </div>
            <img src={happy} alt='happy' />
            <h2>Welcome to miMood!</h2>
            <h3>Track your mood with the help of AI!</h3>
            <p>Machine learning algorithms analyze your entries for emotional cues, providing insight into how you're feeling.</p>
            <p>Add an entry to see emotional analysis.</p>
            <button onClick={() => this.setState({ newUser: false })}>GET STARTED</button>
          </div>}
        
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute;
