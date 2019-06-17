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
        const formattedDate=dateFormat(date, 'mm/dd/yy, h:MM TT')
        console.log(formattedDate,'<-------')

        // const day = new Date(date).toLocaleString([], { hour12: true});
        // const dayTwo = new Date(date)
        // const dayOfWeek = dayTwo.toString().slice(0, 4) 
        // const newDate = dayOfWeek + day.slice(0,-6) + day.slice(-3)     
        
        return <div className='entryTag-div'><h3 className='entry-tag'>{formattedDate}</h3>{this.generateEmoji()}</div>
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