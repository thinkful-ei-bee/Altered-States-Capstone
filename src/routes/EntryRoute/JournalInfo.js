import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'
import './JournalInfo.css'

export default class JournalInfo extends React.Component {

  generateData() {
    const { joy, fear, sadness, 
      anger, analytical, confident, 
      tentative } = this.props;

    const entryTones = { joy, fear, sadness, 
      anger, analytical, confident, 
      tentative }
    if (!entryTones) return

    let data = [];

    for (let key in entryTones) {
      data.push(
        { name: key, amount: entryTones[key] + 10 }
      )
    }

    return data
  }
  
  render() {
    const { currentEntry } = this.props;

    const data = this.generateData()

    return (
      <section className='journal-feedback'>
        <p>{currentEntry}</p>
        <div className='pie-container'>
          <RadarChart cx={175} cy={200} outerRadius={50} width={350} height={300} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
   
            <Radar name="ToneRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
        </div>
      </section>


    )
  }
}