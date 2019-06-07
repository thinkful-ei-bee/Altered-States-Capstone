import React, { Component } from "react";
import Selfie from "../../components/Selfie/Selfie";
import JournalInfo from './JournalInfo'
import BackButton from '../../components/Button/Back-button'
import MoodEntry from '../../components/MoodSelector/moodEntry'
export default class EntryRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      currentEntry: 'This has me thinking, I should buy less stuff.',
      Joy: 0,
      Fear: 0,
      Sadness: 0,
      Anger: 0,
      Analytical: 0,
      Confident: 0,
      Tentative: 0,
    }
  }

  render() {
    return (
      <div>
        <BackButton/>
        <Selfie publicId='ccmwvjilrkkqge3vb2zx'/>
      
        <JournalInfo 
          currentEntry={this.state.currentEntry} 
          joy={this.state.Joy}
          fear={this.state.Fear}
          sadness={this.state.Sadness}
          anger={this.state.Anger}
          analytical={this.state.Analytical}
          confident={this.state.Analytical}
          tentative={this.state.Analytical} />
      </div>
    );
  }
}