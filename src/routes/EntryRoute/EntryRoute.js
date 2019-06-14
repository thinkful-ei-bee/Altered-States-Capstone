import React, { Component } from "react";
// import BackButton from '../../components/Button/Back-button'
import "./EntryRoute.css";
import EntryService from "../../services/entry-service";

import EntryCharts from '../../components/EntryCharts/EntryCharts';


class EntryRoute extends Component {

  constructor(props) {
    super(props)
   
    this.state = {
      id: null,
      user_id: null,
      date_created: null,
      face_url: '',
      happiness: 0,
      face_anger: 0,
      face_contempt: 0,
      face_disgust: 0,
      face_fear: 0,
      face_happiness: 0,
      face_neutral: 0,
      face_sadness: 0,
      face_surprise: 0,
      tone_analytical: 0,
      tone_anger: 0,
      tone_confident: 0,
      tone_fear: 0,
      tone_joy: 0,
      tone_sadness: 0,
      tone_tentative: 0,
    }
  }

  componentDidMount() {
    let id;
    if (this.props.match) {
      id = this.props.match.params.id
    }

    EntryService.getEntryById(id)
      .then(res => {
        this.setState({...res})
      })
  }

  renderSelfie() {
    return this.state.face_url ? <img className='entry-selfie' src={this.state.face_url} alt='selfie'/> : ''
  }



  render() {

    return (
      <div>
        {/* <BackButton/> */}

        <div className='entry-charts-entry-container'>
          <EntryCharts entry={this.state} />
        </div>

        <hr className='divider' />
        
        <div className='entry-container'>
          {this.renderSelfie()}
          <p className={this.state.face_url ? 'entry-text' : 'entry-text-solo'}>
            {this.state.text}
          </p>
        </div>

      </div>
    );
  }
}

export default EntryRoute;
