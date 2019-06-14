import React, {Component} from 'react'
import './moodSelector.css'
import verySad from '../../images/verySad.png'
import sad from '../../images/sad.png'
import neutral from '../../images/neutral.png'
import happy from '../../images/happy.png'
import veryHappy from '../../images/veryHappy.png'

export default class moodSelector extends Component{

    render(){
        return(
            <div className='mood-container'>
                <div className='ne-title'><h3>How are you feeling today?</h3></div>
                {!!this.props.handleClick && <section className='mood_number'onClick={(event) => this.props.handleClick(event)}>
                    <label className='radio'>
                      <input type='radio' name='mood-radio' value='10' id='10' />
                      <img src={verySad} alt='1' id='10' />
                    </label>

                    <label className='radio'>
                      <input type='radio' name='mood-radio' value='20' id='20' />
                      <img src={sad} alt='2' id='20' />
                    </label>

                    <label className='radio'>
                      <input type='radio' name='mood-radio' value='30' id='30' />
                      <img src={neutral} alt='3' id='30' />
                    </label>

                    <label className='radio'>
                      <input type='radio' name='mood-radio' value='40' id='40' />
                      <img src={happy} alt='4' id='40' />
                    </label>

                    <label className='radio'>
                      <input type='radio' name='mood-radio' value='50' id='50' />
                      <img src={veryHappy} alt='5' id='50' />
                    </label>
                </section>}
            </div>
        )
    }
}