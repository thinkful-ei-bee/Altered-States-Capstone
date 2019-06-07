import React, { Component } from "react";
import CloudinaryWidget from "../../components/CloudinaryWidget/CloudinaryWidget";
import EntryService from '../../services/entry-service'
import MoodSelector from '../../components/MoodSelector/moodSelector'
import './NewEntryRoute.css';


export default class NewEntryRoute extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     entry: '',
  //     entryTones: {
  //       Anger: 0,
  //       Joy: 0,
  //       Fear: 0,
  //       Sadness: 0,
  //       Analytical: 0,
  //       Confident: 0,
  //       Tentative: 0
  //     },
  //     happiness: null,
  //     face_url: '',
  //     faceData: {}
  //   }
  // }
  constructor(props) {
    super(props)
    this.state = {
      entry: '',
      happiness: null,
      face_url: '',
      Anger: 0,
      Joy: 0,
      Fear: 0,
      Sadness: 0,
      Analytical: 0,
      Confident: 0,
      Tentative: 0,
      face_anger: 0,
      face_contempt: 0,
      face_disgust: 0,
      face_fear: 0,
      face_happiness: 0,
      face_neutral: 0,
      face_sadness: 0,
      face_surprise: 0
    }
  }
  //faceData structure:
  // {
  //   anger: 0-1,
  //   contempt: 0-1,
  //   disgust: 0-1,
  //   fear: 0-1,
  //   happiness: 0-1,
  //   neutral: 0-1,
  //   sadness: 0-1,
  //   surprise: 0-1,
  // }

  // Entries sent to Tone Analyzer need an 'Authorization' header with a base64 encoded 
  // username and password like so:
  // apikey:3489hgdvuh2384hfetc.etc.etc.etc.

  updateFaceUrl = (url) => {
    this.setState({face_url: url}, () => console.log('face_url:', this.state.face_url))
  }

  updateFaceData = (faceData) => {
    this.setState({...this.state, ...faceData }, () => console.log('face state:', this.state))
  }

  updateEntry = (entry) => {
    this.setState({ entry })
  }

  // handleEntryTones = (tones) => {
  //   this.setState({ entryTones: {...this.state.entryTones, ...tones }}, () => console.log('entryTones:', this.state.entryTones))
  // }
  handleEntryTones = (tones) => {
    this.setState({...this.state, ...tones }, () => console.log('tones state:', this.state))
  }

  handleSubmitEntry(event) {
    event.preventDefault()
    let tones = {}

    EntryService.postEntryToWatson(this.state.entry)
      .then(res => {
        let toneData = res.document_tone.tones
        console.log(res.document_tone.tones)

        for (let i in toneData) {
          tones[toneData[i].tone_name] = Math.floor(toneData[i].score * 50)
        }

        console.log(tones)
        this.handleEntryTones(tones)
      })
  }


  handleHappinessClick=(e)=>{ 

    if(!isNaN(e.target.value)){
      this.setState({
        happiness:Number(e.target.value)
      },()=>{console.log('happiness state:', this.state)} // should we send this to database from here or 
                                      //should we have one submit that will simply send all of State to database?
      )}
    }



  render() {
    return (
      <div>
        <CloudinaryWidget updateFaceUrl={this.updateFaceUrl.bind(this)} updateFaceData={this.updateFaceData.bind(this)}/>
        {this.state.face_url ? <img src={this.state.face_url} alt='uploaded selfie' className='cloudinary-thumb'/> : ''} 
        <MoodSelector handleClick={this.handleHappinessClick}/>
        <form className='entry_form' value={this.state.entry} onSubmit={(event) => this.handleSubmitEntry(event)}>
          <textarea 
            className='entry_area'
            onChange={(event) => this.updateEntry(event.target.value)}></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}