import React, {Component} from 'react'
import './EntryTag.css'

export default class EntryTag extends Component{

    formatEntryTag(){
        const {date}=this.props
       

        const day = new Date(date)
        const dayStr = day.toString()
        const weekDay = dayStr.slice(0,3)
        const dateStr = dayStr.slice(4,15)
        let time = dayStr.slice(16,21)
        console.log(time)


        
        
        return <button className='entry-tag' onClick={()=>this.props.handleClick(this.props.id)}>
        
       {weekDay}<br/>
       {dateStr}<br/>
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