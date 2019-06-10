import React, {Component} from 'react'
import './EntryTag.css'

export default class EntryTag extends Component{

    formatEntryTag(){
        const {date}=this.props
        const year = date.slice(0,4)
        const month = date.slice(5,7)
        const day = date.slice(8,10)
        const time = date.slice(11,16)
        
        return <button className='entry-tag' onClick={()=>this.props.handleClick(this.props.id)}>{month}/{day}/{year}<br/>
        {time}
        </button>
    }
  
    render(){
       
        const tags = this.formatEntryTag()
        
        
        return(
            <div>
                {tags}
            </div>
        )
    }
}