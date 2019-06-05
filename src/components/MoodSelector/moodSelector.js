import React, {Component} from 'react'
import './moodSelector.css'

export default class moodSelector extends Component{
    constructor(props){
        super(props)
        this.state={
            moodNumber:null
        }
    }

    handleClick=(e)=>{ // <------- should come from parent component
       
       
        this.setState({
            moodNumber:Number(e.target.value)
        },()=>{
            console.log(this.state)
        }
        )}


    render(){
        return(
            <div> How are you feeling today?
                <section onClick={this.handleClick.bind(this)}>
                    <button className='button button1' value='10'>10</button>
                    <button className='button button2'  value='20'>20</button>
                    <button className='button button3' value='30'>30</button>
                    <button className='button button4' value='40'>40</button>
                    <button className='button button5' value='50'>50</button>
                </section>
            </div>
        )
    }
}