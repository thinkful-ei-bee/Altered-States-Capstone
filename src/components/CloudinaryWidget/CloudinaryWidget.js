import React, { Component } from "react";
import UserContext from '../../contexts/UserContext';
import EntryService from '../../services/entry-service';
import './CloudinaryWidget.css'

class CloudinaryWidget extends Component {
  static contextType = UserContext

  uploadWidget() {
    let _this = this;
    window.cloudinary.openUploadWidget({ cloud_name: 'mood-flux', upload_preset: 'bsg390qa', 
      sources: ['local', 'url', 'camera'], tags:[this.context.user.id]},
        function(error, result) {
            if (result){
              _this.props.updateFaceUrl(result[0].url)
              _this.handleAnalysis(result[0].url)
            }
            
        });
    }

  handleAnalysis(url) {
    EntryService.postSelfieToAzure(url)
      .then(res => {
        if (!res.length) {
          return
        }
        const faceRes = res[0].faceAttributes.emotion

        for (let i in faceRes) {
          faceRes[i] = Math.floor(faceRes[i] * 50)
        }

        const faceData = {
          face_anger: faceRes.anger,
          face_contempt: faceRes.contempt,
          face_disgust: faceRes.disgust,
          face_fear: faceRes.fear,
          face_happiness: faceRes.happiness,
          face_neutral: faceRes.neutral,
          face_sadness: faceRes.sadness,
          face_surprise: faceRes.surprise
        }

        this.props.updateFaceData(faceData)
      })
  }


  
  render() {
    
    return (
      <div className='cloud-button'>
        <div className='ne-title'><h3>Add a selfie that reflects your mood</h3></div>
        <button onClick={this.uploadWidget.bind(this)} className="upload-button">
          Add Selfie
        </button>
      </div>
      
    );
  }
}

export default CloudinaryWidget;
