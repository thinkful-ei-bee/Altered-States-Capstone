import React, { Component } from "react";
import {Image, Transformation} from 'cloudinary-react';

import './Selfie.css'

class Selfie extends Component {

  render() {
    
    return (
      <div>

        <Image cloudName='mood-flux' publicId={`selfies/${this.props.publicId}`} className='cloudinary-thumb'>
          <Transformation >
          </Transformation>
        </Image>

      </div>
      
    );
  }
}

export default Selfie;
