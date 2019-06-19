import React, {Component} from 'react'
import './EntryTag.css'
import veryHappy from '../../images/veryHappy.png'
import happy from '../../images/happy.png'
import neutral from '../../images/neutral.png'
import sad from '../../images/sad.png'
import verySad from '../../images/verySad.png'
import dateFormat from 'dateformat';

export default class EntryTag extends Component{

    generateHappiness(happiness) {
        switch (happiness) {
            case 10: return verySad;
            case 20: return sad;
            case 30: return neutral;
            case 40: return happy;
            case 50: return veryHappy;
            default: return ''
        }
    }

    generateEmoji() {
        const hapValue = this.generateHappiness(this.props.happiness)
        return this.props.happiness
        ? <img src={hapValue} alt={hapValue.toString()} />
        : ''
    }

    formatEntryTag(){
        
        const {date}=this.props

        const formattedDate=dateFormat(date, 'ddd mm/dd/yy')
        const formattedTime = dateFormat(date, 'h:MM TT')
     
        return (
          <div className='entryTag-div'>
            <h3 className='entry-tag'>{formattedDate}</h3>{this.generateEmoji()}
            <h3 className='entry-time' id='entry-time'>{formattedTime}</h3>
          </div>)
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