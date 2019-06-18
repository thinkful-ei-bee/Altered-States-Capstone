import React, { Component } from "react";
import './ZoomBox.css'


export default class ZoomBox extends Component {
render() {
    return (
      
      <div className='zoom-div'>
          <div className='zoom-end' onClick={()=>this.props.endZoom()} />
          <img className='zoom-selfie' src={this.props.url} alt='zoom-selfie' />
      </div>
    )
  }
}