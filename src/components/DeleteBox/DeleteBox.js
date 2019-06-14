import React, { Component } from "react";
import './DeleteBox.css'


export default class DeleteBox extends Component {
render() {
    return (
      <div className='del-prevent-clicks'>
        <div className='delete-div'>
          <p>Are you sure you want to delete this entry?</p>
          <button onClick={() => this.props.cancelDelete()}>cancel</button>
          <button onClick={() => this.props.confirmDelete()}>DELETE</button>
        </div>
      </div>
    )
  }
}