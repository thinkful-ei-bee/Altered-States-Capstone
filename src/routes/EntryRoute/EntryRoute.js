import React, { Component } from "react";
import Selfie from "../../components/Selfie/Selfie";
import JournalInfo from './JournalInfo'
import BackButton from '../../components/Button/Back-button'

export default class EntryRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      currentEntry: 'This has me thinking, we should remake point B. Joyous day.',
      entryTones: { joy: 45, analytical: 32 },
    }
  }

  render() {
    return (
      <div>
        <BackButton/>
        <Selfie publicId='ccmwvjilrkkqge3vb2zx'/>
      
        <JournalInfo 
          currentEntry={this.state.currentEntry} 
          entryTones={this.state.entryTones} />
      </div>
    );
  }
}