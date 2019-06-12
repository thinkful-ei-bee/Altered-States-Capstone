import React, { Component } from "react";
import { Radar, RadarChart, PolarGrid,
  PolarAngleAxis, ResponsiveContainer } from 'recharts'
import EntryTag from '../EntryTag/EntryTag'
import "./EntryCharts.css";


class EntryCharts extends Component {

  generateToneData() {
    const {entry} = this.props

    let data = []

    for (let key in entry) {
      if (key.split('_')[0] === 'tone') {
        let keyWord = key.split('_')[1]
        data.push({
          name: keyWord,
          amount: entry[key] + 10
        })
      }
    }
    
    return data

  }

  generateEmotionData() {
    const {entry} = this.props

    let data = []

    for (let key in entry) {
      if (key.split('_')[0] === 'face' && key.split('_')[1] !== 'url') {
        let keyWord = key.split('_')[1]

        data.push({
          name: keyWord,
          amount: entry[key] + 10
        })
      }
    }
    return data
  }

  renderEntryLabel() {
    const {date_created} = this.props.entry
    if (this.props.label) {
      return this.props.label
    } else {
      return <EntryTag date={date_created} />
    }
  }

  render() {

    const toneData = this.generateToneData()

    const faceData = this.generateEmotionData()

    const isMobile = window.innerWidth < 760;
    const radius = isMobile ? 45 : 80;

    return (
      <div>
        <div className='radar-charts'>
          <div className='entry-label'>{this.renderEntryLabel()}</div>
          <h3 className='chart-title-tone'>Writing Analysis</h3>
          <div className='tone-table'>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart 
                  cx='50%' 
                  cy='50%' 
                  outerRadius={radius} 
                  width={350} 
                  height={300} 
                  data={toneData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                
                <Radar name="ToneRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <h3 className='chart-title-face'>Face Analysis</h3>
          <div className='face-table'>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart 
                cx='50%' 
                cy='50%'  
                outerRadius={radius} 
                width={350} 
                height={300} 
                data={faceData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
            
                <Radar name="FaceRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    );
  }
}

export default EntryCharts;
