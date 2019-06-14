import React, {Component} from 'react'
import { LineChart, Line, 
    YAxis, XAxis, ResponsiveContainer } from 'recharts'
import veryHappy from '../../images/veryHappy.png'
import happy from '../../images/happy.png'
import neutral from '../../images/neutral.png'
import sad from '../../images/sad.png'
import verySad from '../../images/verySad.png'

export default class TrendGraph extends Component{
    constructor(props) {
        super(props)
        this.state = {
          entries: [],
          
        }
      }



      


    render(){
        const isMobile = window.innerWidth < 760;
        const width = isMobile ? 400 : 900;
        const height = isMobile ? 125 : 175;
     

        return(
            <div className='graph'>

            <ResponsiveContainer  width='100%' height='100%' margin={{top:15}}>
            <div>{this.props.className} 

            <LineChart width={width} height={height} data={this.props.data} margin={{right:40, top:5}}>
            <Line type='monotone' dataKey={this.props.dataKey} stroke='#8884d8' strokeWidth={2} />
            <YAxis interval={0} ticks={this.props.className ==='happiness'?[0,1,2,3,4,5]:[0,1,2,3,4,5]} type='number' domain={[0, 5]} />
            <XAxis  interval={0} dataKey='name'/>
          </LineChart>
            </div>
            </ResponsiveContainer>
            </div>
        )
    }
}