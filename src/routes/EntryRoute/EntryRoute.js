import React, { Component } from "react";
import "./EntryRoute.css";
import EntryService from "../../services/entry-service";
import { HashLink as Link } from 'react-router-hash-link';
import EntryCharts from '../../components/EntryCharts/EntryCharts';
import DeleteBox from '../../components/DeleteBox/DeleteBox';
import ZoomBox from '../../components/ZoomBox/ZoomBox';


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

      deleting: false,
      zoom: false
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
    return this.state.face_url 
    ? <img onClick={() => this.handleZoom()} className='entry-selfie' src={this.state.face_url} alt='selfie'/> : ''
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

  handleZoom() {
    this.setState({zoom: true})
  }

  endZoom() {
    this.setState({zoom: false})
  }



  render() {

    const selfie = this.state.face_url ? true : false;

    return (
      <div>
        {this.state.deleting 
          && <DeleteBox 
            cancelDelete={this.cancelDelete.bind(this)} 
            confirmDelete={this.confirmDelete.bind(this)}
            target='entry'
            />
        }

        {this.state.zoom 
          && <ZoomBox 
            endZoom={this.endZoom.bind(this)} 
            url={this.state.face_url}
            />
        }

        <div className='entry-charts-entry-container'>
          {this.props.match.params.origin === 'new' && <h2 className='created-feedback'>Entry Created</h2>}
          <EntryCharts entry={this.state} selfie={selfie}/>
        </div>

        <hr className='divider' />

        <div className='entry-container'>
          <div className='text-selfie-div'>
            {this.renderSelfie()}
            <p className='entry-text'>
              {this.state.text}
            </p>
          </div>
          <div className='entry-buttons'>
            <Link className='back-button' to={`/#entry-${this.state.id}`}><i className="fa fa-arrow-left"></i></Link>
            <i className="fa fa-trash" onClick={() => this.handleDelete()}></i>
          </div>
        </div>

      </div>
    );
  }
}

export default EntryRoute;
