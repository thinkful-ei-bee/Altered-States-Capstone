import React, {Component} from 'react'
import './EntryTag.css'

export default class EntryTag extends Component{

    formatEntryTag(){
        const {date}=this.props
       

        const day = new Date(date).toLocaleString([], { hour12: true});
        
        const newDate = day.slice(0,-6) + day.slice(-3)     
        console.log(day)
        


        
        
        return <button className='entry-tag' onClick={()=>this.props.handleClick(this.props.id)}>
        
       {newDate}
       
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