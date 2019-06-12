import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import CloudinaryWidget from "../../components/CloudinaryWidget/CloudinaryWidget";
import EntryService from '../../services/entry-service'
import MoodSelector from '../../components/MoodSelector/moodSelector'
import './NewEntryRoute.css';


export default class NewEntryRoute extends Component {

  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      res_id: '',
      newEntry: {
        text: '',
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
  }


  // Entries sent to Tone Analyzer need an 'Authorization' header with a base64 encoded 
  // username and password like so:
  // apikey:3489hgdvuh2384hfetc.etc.etc.etc.

  updateFaceUrl = async (url) => {
    await this.setState({newEntry: {...this.state.newEntry, face_url: url}}, () => console.log('face_url:', this.state.newEntry.face_url))
    document.getElementById('parallax').style.backgroundImage = `url(${this.state.newEntry.face_url})`
  }

  updateFaceData = (faceData) => {
    this.setState({newEntry: {...this.state.newEntry, ...faceData }}, () => console.log('face state:', this.state.newEntry))
  }

  updateEntry = (text) => {
    this.setState({ newEntry: {...this.state.newEntry, text }})
  }

  handleEntryTones = (tones) => {
    this.setState({newEntry: {...this.state.newEntry, ...tones }}, () => console.log('tones state:', this.state.newEntry))
  }

  handleSubmitEntry(event) {
    event.preventDefault()
    let tones = {}

    EntryService.postEntryToWatson(this.state.newEntry.text)
      .then(res => {
        let toneData = res.document_tone.tones

        for (let i in toneData) {
          tones[toneData[i].tone_name] = Math.floor(toneData[i].score * 50)
        }

        this.handleEntryTones(tones)
      })
      .then(() => {
        EntryService.postEntry(this.state.newEntry)
          .then(res => {
            this.setState({ res_id: res.id })
            this.setRedirect()
          })
      })
  }


  handleHappinessClick=(e)=>{ 

    if(!isNaN(e.target.value)){
      this.setState({
        newEntry: {...this.state.newEntry, happiness:Number(e.target.value)}
      },()=>{console.log('happiness state:', this.state.newEntry)} // should we send this to database from here or 
                                      //should we have one submit that will simply send all of State to database?
      )}
    }

  handleFinishedEntry(event, newEntry) {
    event.preventDefault();
    EntryService.postEntry(newEntry)
      .then(res => {
        this.setState({res_id: res.id})
        this.setRedirect()
      })
  }

  setRedirect() {
    this.setState({redirect: true})
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to={`/entry/${this.state.res_id}`} />
    }
  }

// <img src={this.state.newEntry.face_url} alt='uploaded selfie' className='cloudinary-thumb'/>
  handleDeleteSelfie() {
    EntryService.deleteSelfie(this.state.newEntry.face_url)
      .then(res => {
        this.setState({newEntry: {...this.state.newEntry, face_url: ''}}, () => console.log('state', this.state.newEntry))
        console.log('res', res)
      })
  }

  render() {
    return (
      <div>

        {this.state.newEntry.face_url && <div id='parallax'></div>}

        {!this.state.newEntry.face_url && 
          <CloudinaryWidget 
            updateFaceUrl={this.updateFaceUrl.bind(this)} 
            updateFaceData={this.updateFaceData.bind(this)} />}

        <MoodSelector handleClick={this.handleHappinessClick}/>

        <form className='entry_form' value={this.state.newEntry.text} onSubmit={(event) => this.handleSubmitEntry(event)}>
          <textarea 
            className='entry_area'
            maxLength='5000'
            onChange={(event) => this.updateEntry(event.target.value)}></textarea>
          <Link to='/'>CANCEL</Link>
          <button type='submit'>SUBMIT</button>
        </form>

        {this.renderRedirect()}
      </div>
    );
  }
}