import React, {Component} from 'react'
import './EntryTag.css'

export default class EntryTag extends Component{

    formatEntryTag(){
        
        const {date}=this.props
       
        const day = new Date(date).toLocaleString([], { hour12: true});
        
        const newDate = day.slice(0,-6) + day.slice(-3)     
        
        return <h3 className='entry-tag'>{newDate}</h3>
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