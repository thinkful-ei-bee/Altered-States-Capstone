import React, { Component } from "react";
import EntryService from '../../services/entry-service'
import MoodSelector from '../../components/MoodSelector/moodSelector'

export default class NewEntryRoute extends Component {
  constructor(props){
    super(props)
    this.state={
        happiness:null
    }
}

  // Entries sent to Tone Analyzer need an 'Authorization' header with a base64 encoded 
  // username and password like so:
  // apikey:3489hgdvuh2384hfetc.etc.etc.etc.

  handleSubmitEntry(event) {
    event.preventDefault()

    const { entry, handleEntryTones } = this.props
    let tones = {}

    EntryService.postEntryToWatson(entry)
      .then(res => {
        let toneData = res.document_tone.tones
        console.log(res.document_tone.tones)

        for (let i in toneData) {
          tones[toneData[i].tone_name] = Math.floor(toneData[i].score * 50)
        }

        console.log(tones)
        handleEntryTones(tones)
      })
  }


  handleHappinessClick=(e)=>{ 

    if(!isNaN(e.target.value)){
      this.setState({
        happiness:Number(e.target.value)
      },()=>{console.log(this.state)} // should we send this to database from here or 
                                      //should we have one submit that will simply send all of State to database?
      )}
    }



  render() {
    const { updateEntry, entry } = this.props
    return (
      <div>
        <MoodSelector handleClick={this.handleHappinessClick}/>
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