import React, { Component } from "react";
import EntryService from '../../services/entry-service'


export default class NewEntryRoute extends Component {
  // Entries sent to Tone Analyzer need an 'Authorization' header with a base64 encoded 
  // username and password like so:
  // apikey:3489hgdvuh2384hfetc.etc.etc.etc.

  handleSubmitEntry(event) {
    event.preventDefault()

    const { entry } = this.props

    EntryService.postEntryToWatson(entry)
      .then(res => {
        console.log(res)
      })
  }

  render() {
    const { updateEntry, entry } = this.props
    return (
      <div>
        <form className='entry_form' value={entry} onSubmit={(event) => this.handleSubmitEntry(event)}>
          <textarea 
            className='entry_area'
            onChange={(event) => updateEntry(event.target.value)}></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}