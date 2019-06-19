import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import CloudinaryWidget from "../../components/CloudinaryWidget/CloudinaryWidget";
import EntryService from '../../services/entry-service'
import MoodSelector from '../../components/MoodSelector/moodSelector'
// import Moment from 'react-moment'
import DeleteBox from '../../components/DeleteBox/DeleteBox';
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
      },
      deleting: false
    }
  }


  // Entries sent to Tone Analyzer need an 'Authorization' header with a base64 encoded 
  // username and password like so:
  // apikey:3489hgdvuh2384hfetc.etc.etc.etc.

  componentDidUpdate() {
    this.handleDisableSubmit()
  }

  updateFaceUrl = async (url) => {
    await this.setState({newEntry: {...this.state.newEntry, face_url: url}})
    document.getElementById('parallax').style.backgroundImage = `url(${this.state.newEntry.face_url})`
  }

  updateFaceData = (faceData) => {
    this.setState({newEntry: {...this.state.newEntry, ...faceData }})
  }

  updateEntry = (text) => {
    this.setState({ newEntry: {...this.state.newEntry, text }})
  }

  handleEntryTones = (tones) => {
    this.setState({newEntry: {...this.state.newEntry, ...tones }})
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

    let num = e.target.id


    this.setState({newEntry: {...this.state.newEntry, happiness: num}}) // should we send this to database from here or 
                                    //should we have one submit that will simply send all of State to database?
    
    
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
      return <Redirect to={`/entry/${this.state.res_id}/new`} />
    }
  }

  handleDelete() {
    this.setState({deleting: true})
  }

  cancelDelete() {
    this.setState({deleting: false})
  }


  confirmDelete() {
    EntryService.deleteSelfie(this.state.newEntry.face_url)
      .then(res => {
        this.setState({deleting: false, newEntry: {...this.state.newEntry, face_url: ''}})
      })
  }

  handleDisableSubmit = () => {
    if (this.state.newEntry.text && this.state.newEntry.happiness) {
      console.log('enabled')
      document.getElementById('ne-submit').disabled = false;
    } else {
      console.log('disabled')
      document.getElementById('ne-submit').disabled = true;
    }
  }

  render() {
    let date = new Date().toString().slice(0, 10)
    return (
      <div className='new-entry-page'>

        {this.state.deleting 
          && <DeleteBox 
            cancelDelete={this.cancelDelete.bind(this)} 
            confirmDelete={this.confirmDelete.bind(this)}
            target='selfie'
            />
        }

        <div className='ne-title ne-title-top'>

          <h2 >{date}</h2>
          <h3 >New Entry</h3>
        </div>

        {this.state.newEntry.face_url && <div onClick={() => this.handleDelete()}id='parallax'></div>}

        {!this.state.newEntry.face_url && 
          <CloudinaryWidget 
            updateFaceUrl={this.updateFaceUrl.bind(this)} 
            updateFaceData={this.updateFaceData.bind(this)} />}

        <MoodSelector handleClick={this.handleHappinessClick}/>

        <form className='entry_form left' value={this.state.newEntry.text} onSubmit={(event) => this.handleSubmitEntry(event)}>
          <div className='ne-title ta'><h3>How's it going? What's on your mind?</h3></div>
          <textarea 
            className='entry_area'
            maxLength='5000'
            onChange={(event) => this.updateEntry(event.target.value)}></textarea>
            <footer>
              <Link to='/'>CANCEL</Link>
              <button type='submit' className='ne-submit' id='ne-submit' disabled>SUBMIT</button>
            </footer>
        </form>

        {this.renderRedirect()}
      </div>
    );
  }
}