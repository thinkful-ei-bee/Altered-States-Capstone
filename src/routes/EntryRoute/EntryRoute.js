import React, { Component } from "react";
import "./EntryRoute.css";
import EntryService from "../../services/entry-service";

import EntryCharts from '../../components/EntryCharts/EntryCharts';
import DeleteBox from '../../components/DeleteBox/DeleteBox';


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

      deleting: false
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

  handleDelete() {
    this.setState({deleting: true})
  }

  cancelDelete() {
    this.setState({deleting: false})
  }

  async callDelete() {
    if (!this.state.face_url){
      await EntryService.deleteEntry(this.state.id)
    }
    else {
      await EntryService.deleteEntry(this.state.id)
      await EntryService.deleteSelfie(this.state.face_url)
    }
  }

  confirmDelete() {
    this.callDelete()
      .then(() => {
        this.props.history.push('/')
      })
  }



  render() {

    return (
      <div>
        {this.state.deleting 
          && <DeleteBox 
            cancelDelete={this.cancelDelete.bind(this)} 
            confirmDelete={this.confirmDelete.bind(this)}
            target='entry'
            />
        }

        <div className='entry-charts-entry-container'>
          <EntryCharts entry={this.state} />
        </div>

        <hr className='divider' />
        
        <div className='entry-container'>
          {this.renderSelfie()}
          <p className={this.state.face_url ? 'entry-text' : 'entry-text-solo'}>
            {this.state.text}
          </p>
          <button className='delete-button' onClick={() => this.handleDelete()}><i className="fa fa-trash"></i></button>
        </div>

      </div>
    );
  }
}

export default EntryRoute;
