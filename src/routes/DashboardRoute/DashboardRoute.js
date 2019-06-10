import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, Radar, RadarChart, PolarGrid,
  PolarAngleAxis, YAxis, XAxis } from 'recharts'
import "./DashboardRoute.css";
import EntryService from "../../services/entry-service";

class DashboardRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
    }
  }

  componentDidMount() {
    EntryService.getUserEntries()
      .then(res => {
        this.setState({entries: res})
      })
  }

  generateToneData() {
    const { entries } = this.state

    let data = []

    // No entries
    if (entries.length === 0) {
      return
    }

    for (let key in entries[entries.length - 1]) {
      if (key.split('_')[0] === 'tone') {
        let keyWord = key.split('_')[1]
        data.push({
          name: keyWord,
          amount: entries[entries.length - 1][key] + 10
        })
      }
    }
    
    return data

  }

  generateEmotionData() {
    const { entries } = this.state
    let data = []

    if (entries.length === 0) return

    for (let key in entries[entries.length - 1]) {
      if (key.split('_')[0] === 'face' && key.split('_')[1] !== 'url') {
        let keyWord = key.split('_')[1]

        data.push({
          name: keyWord,
          amount: entries[entries.length - 1][key] + 10
        })
      }
    }
    return data
  }

  generateHappinessData() {
    const { entries } = this.state
    let data = []

    if (!entries) return

    if (entries.length >= 5) {
      for (let i = entries.length - 5; i < entries.length; i++) {
        data.push({
          name: entries[i].date_created,
          Happiness: entries[i].happiness / 10
        })
      }
    }

    else if (entries.length < 5) {
      for (let i = 0; i < entries.length; i++) {
        data.push({
          name: entries[i].date_created,
          Happiness: entries[i].happiness / 10
        })
      }
    }

    return data
  }


  render() {

    const toneData = this.generateToneData()

    const faceData = this.generateEmotionData()

    const happinessData = this.generateHappinessData()

    return (
      <div>
        <h2 className='chart-title'>Written Analysis</h2>
        <div className='tone-table'>
          <RadarChart cx={175} cy={200} outerRadius={50} width={350} height={300} data={toneData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            
            <Radar name="ToneRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
        </div>

        <h2 className='chart-title'>Face Analysis</h2>
        <div className='face-table'>
          <RadarChart cx={175} cy={200} outerRadius={50} width={350} height={300} data={faceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
        
            <Radar name="FaceRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
        </div>

        <h2>Happiness</h2>
        <div className='happiness-table'>
          <LineChart width={300} height={175} data={happinessData}>
            <Line type='monotone' dataKey='Happiness' stroke='#8884d8' strokeWidth={2} />
            <YAxis ticks={[0,1,2,3,4,5]} type='number' domain={[0, 5]} />
            <XAxis />
          </LineChart>
        </div>

        <Link to="/new" className="new-entry-button">
            New Entry
        </Link>

        <ul className='past-entries'>
          {this.state.entries.length > 0 && this.state.entries.map(entry => {
            return (
              <li>
                <Link to={`/entry/${entry.id}`}>
                <h3>{entry.date_created}</h3>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default DashboardRoute;
