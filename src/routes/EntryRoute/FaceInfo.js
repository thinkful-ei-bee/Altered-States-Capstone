import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts'

export default class FaceInfo extends React.Component {
  
  generateData() {
    const { anger, contempt, disgust,
      fear, happiness, neutral, sadness, surprise } = this.props

      const entryEmotions = { anger, contempt, disgust,
      fear, happiness, neutral, sadness, surprise }

      if (!entryEmotions) return

      let data = []

      for (let key in entryEmotions) {
        data.push({
          name: key, amount: entryEmotions[key] + 10
        })
      }

    return data
  }
  
  render() {
    const data = this.generateData()
    return (
      <section className='emotion-feedback'>
        <div>
          <RadarChart cx={175} cy={175} outerRadius={50} width={350} height={300} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
   
            <Radar name="ToneRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
        </div>
      </section>
    )
  }
}