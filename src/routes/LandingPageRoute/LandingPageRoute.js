import React, { Component } from "react";
import {Link} from 'react-router-dom';
import verySad from '../../images/verySad.png'
import sad from '../../images/sad.png'
import neutral from '../../images/neutral.png'
import happy from '../../images/happy.png'
import veryHappy from '../../images/veryHappy.png'
import './LandingPageRoute.css';

class LandingPageRoute extends Component {


  render() {
    return (
          <div className='tutorial-container'>
            <div className='onboard-header'>
              <h1>
              <span>miMood</span>
              <span className='journal'>journal</span>
              </h1>
            </div>
            <div className='tutorial-emojis'>
              <img src={verySad} alt='verySad' />
              <img src={sad} alt='sad' />
              <img src={neutral} alt='neutral' />
              <img src={happy} alt='happy' />
              <img src={veryHappy} alt='veryHappy' />
            </div>
            <h3>Welcome to miMood!</h3>
            <p>
              miMood is a journaling app that helps you to track your emotions. 
              Machine learning algorithms analyze your entries for emotional cues, providing insight into how you're feeling.  
            </p>
            <Link to='/register'>GET STARTED</Link>
          </div>
    );
  }
}

export default LandingPageRoute;
