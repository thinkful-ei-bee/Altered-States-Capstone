import React, {Component} from 'react'
import { LineChart, Line, 
    YAxis, XAxis, ResponsiveContainer } from 'recharts'


export default class TrendGraph extends Component{
    constructor(props) {
        super(props)
        this.state = {
          entries: [],
          
        }
      }



      


    render(){
        const isMobile = window.innerWidth < 760;
        const width = isMobile ? 300 : 700;
     

        return(
            <ResponsiveContainer  width='100%' height='100%'>
            <div>{this.props.className} 

            <LineChart width={width} height={175} data={this.props.data}>
            <Line type='monotone' dataKey={this.props.dataKey} stroke='#8884d8' strokeWidth={2} />
            <YAxis ticks={[0,1,2,3,4,5]} type='number' domain={[0, 5]} />
            <XAxis dataKey='name'/>
          </LineChart>
            </div>
            </ResponsiveContainer>
        )
    }
}