import React, { Component } from "react";
import UserContext from '../../contexts/UserContext';

class CloudinaryWidget extends Component {
  static contextType = UserContext

  uploadWidget() {
    window.cloudinary.openUploadWidget({ cloud_name: 'mood-flux', upload_preset: 'bsg390qa', tags:[this.context.user.id]},
        function(error, result) {
            console.log(result);
        });
    }

    
  
  render() {
    
    return (
      <div>
        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
          Add Selfie
        </button>
      </div>
      
    );
  }
}

export default CloudinaryWidget;
