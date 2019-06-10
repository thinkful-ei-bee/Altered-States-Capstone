import React, { Component } from "react";
import Selfie from "../../components/Selfie/Selfie";
import JournalInfo from './JournalInfo'
import FaceInfo from './FaceInfo'
import BackButton from '../../components/Button/Back-button'
import MoodEntry from '../../components/MoodSelector/moodEntry'
import EntryService from "../../services/entry-service";
import './EntryRoute.css'

export default class EntryRoute extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   entries: [],
    //   currentEntry: 'This has me thinking, I should buy less stuff.',
    //   Joy: 0,
    //   Fear: 0,
    //   Sadness: 0,
    //   Anger: 0,
    //   Analytical: 0,
    //   Confident: 0,
    //   Tentative: 0,
    // }
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
    const { id } = this.props.match.params

    EntryService.getEntryById(id)
      .then(res => {
        this.setState({...res})
      })
  }

  render() {
    return (
      <div>
        <BackButton/>
        <h2>{this.state.date_created}</h2>
        <img src={this.state.face_url} alt='selfie'/>
      
        <JournalInfo 
          currentEntry={this.state.currentEntry} 
          joy={this.state.tone_joy}
          fear={this.state.tone_fear}
          sadness={this.state.tone_sadness}
          anger={this.state.tone_anger}
          analytical={this.state.tone_analytical}
          confident={this.state.tone_confident}
          tentative={this.state.tone_tentative} />

          <FaceInfo 
            anger={this.state.face_anger}
            contempt={this.state.contempt}
            disgust={this.state.disgust}
            fear={this.state.fear}
            happiness={this.state.happiness}
            neutral={this.state.neutral}
            sadness={this.state.happiness}
            surprise={this.state.surprise}
          />

        <p>{this.state.text}</p>
      </div>
    );
  }
}