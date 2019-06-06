import React, { Component } from "react";
import UserContext from '../../contexts/UserContext';
import {Image, Transformation} from 'cloudinary-react';

import './CloudinaryWidget.css'

class CloudinaryWidget extends Component {
  static contextType = UserContext
  state = {
    thumbnail: ''
  }

  uploadWidget() {
    let _this = this;
    window.cloudinary.openUploadWidget({ cloud_name: 'mood-flux', upload_preset: 'bsg390qa', 
      sources: ['local', 'url', 'camera'], tags:[this.context.user.id]},
        function(error, result) {
            console.log(result);
            console.log(result ? result[0].thumbnail_url : 'empty' )
            _this.setState({thumbnail: result ? result[0].url : ''})
        });
    }

  
  render() {
    
    return (
      <div>
        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
          Add Selfie
        </button>
        {this.state.thumbnail ? <img src={this.state.thumbnail} alt='thumb' className='cloudinary-thumb'/> : ''}

        <Image cloudName='mood-flux' publicId='selfies/zoq4a1ncyywtt8emdjnm' className='cloudinary-thumb'>
          <Transformation >
          </Transformation>
        </Image>

      </div>
      
    );
  }
}

export default CloudinaryWidget;
