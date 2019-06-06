import React, { Component } from "react";
import UserContext from '../../contexts/UserContext';
import EntryService from '../../services/entry-service';
import './CloudinaryWidget.css'

class CloudinaryWidget extends Component {
  static contextType = UserContext
  state = {
    url: ''
  }

  uploadWidget() {
    let _this = this;
    window.cloudinary.openUploadWidget({ cloud_name: 'mood-flux', upload_preset: 'bsg390qa', 
      sources: ['local', 'url', 'camera'], tags:[this.context.user.id]},
        function(error, result) {
            console.log(result);
            console.log(result ? result[0].thumbnail_url : 'empty' )
            _this.setState({url: result ? result[0].url : ''})
            _this.handleAnalysis(result[0].url)
        });
    }

  handleAnalysis(url) {
    EntryService.postSelfieToAzure(url)
      .then(res => {
        console.log('faceRes:', res)
      })
  }

  
  render() {
    
    return (
      <div>
        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
          Add Selfie
        </button>
        {this.state.url ? <img src={this.state.url} alt='thumb' className='cloudinary-thumb'/> : ''}
      </div>
      
    );
  }
}

export default CloudinaryWidget;
