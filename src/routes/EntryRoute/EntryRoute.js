import React, { Component } from "react";
import JournalInfo from './JournalInfo'


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
        <JournalInfo 
          currentEntry={this.state.currentEntry} 
          entryTones={this.state.entryTones} />
      </div>
    );
  }
}