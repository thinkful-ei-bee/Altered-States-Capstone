import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, Radar, RadarChart, PolarGrid,
  PolarAngleAxis, YAxis, XAxis, ResponsiveContainer } from 'recharts'
import "./DashboardRoute.css";
import EntryService from "../../services/entry-service";

class DashboardRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      display: null
    }
  }

  componentDidMount() {
    EntryService.getUserEntries()
      .then(res => {
        this.setState({entries: res}, () => {
          if (this.state.entries.length === 0) return;
          this.setState({display: this.state.entries[-1]})
        })
      })
  }

  generateToneData() {
    const { entries, display } = this.state

    let data = []

    // No entries
    if (entries.length === 0) {
      return
    }

    const selected = entries.filter(entry => entry.id === display)

    const target = selected.length > 0 ? selected[0] : entries[entries.length - 1]

    for (let key in target) {
      if (key.split('_')[0] === 'tone') {
        let keyWord = key.split('_')[1]
        data.push({
          name: keyWord,
          amount: target[key] + 10
        })
      }
    }
    
    return data

  }

  generateEmotionData() {
    const { entries, display } = this.state
    let data = []

    if (entries.length === 0) return

    const selected = entries.filter(entry => entry.id === display)

    const target = selected.length > 0 ? selected[0] : entries[entries.length - 1]

    for (let key in target) {
      if (key.split('_')[0] === 'face' && key.split('_')[1] !== 'url') {
        let keyWord = key.split('_')[1]

        data.push({
          name: keyWord,
          amount: target[key] + 10
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

  handleDisplayChange(id) {
    this.setState({display: id})

  }

  renderSelectedEntryDate() {
    const { entries, display } = this.state

    if (entries.length === 0) return <p>No Entries</p>

    const selected = entries.filter(entry => entry.id === display)

    const target = selected.length > 0 ? selected[0] : entries[entries.length - 1]

    return <Link to={`/entry/${target.id}`} ><h3>{target.date_created}</h3></Link>
  }


  render() {

    const toneData = this.generateToneData()

    const faceData = this.generateEmotionData()

    const happinessData = this.generateHappinessData()

    // const screenWidth = window.innerWidth; 760
    const isMobile = window.innerWidth < 760;
    const radius = isMobile ? 45 : 80;

    return (
      <div>
        <div className='radar-charts'>
          <div className='entry-label'>{this.renderSelectedEntryDate()}</div>
          <h3 className='chart-title-tone'>Written Analysis</h3>
          <div className='tone-table'>
            <ResponsiveContainer width='100%' height='100%'>
              <RadarChart 
                  // cx={175} 
                  // cy={200} 
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
                // cx={175} 
                // cy={200}
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
        {/* <h3>Happiness</h3>
        <div className='happiness-table'>
          <LineChart width={300} height={175} data={happinessData}>
            <Line type='monotone' dataKey='Happiness' stroke='#8884d8' strokeWidth={2} />
            <YAxis ticks={[0,1,2,3,4,5]} type='number' domain={[0, 5]} />
            <XAxis />
          </LineChart>
        </div> */}

        {/* <Link to="/new" className="new-entry-button">
            New Entry
        </Link> */}

        <ul className='past-entries'>
          <li>
            <Link to="/new" className="new-entry-button">
                <h3>New Entry</h3>
            </Link>
          </li>
          {this.state.entries.length > 0 && this.state.entries.map(entry => {
            return (
              <li>
                <div onClick={() => this.handleDisplayChange(entry.id)}>
                <h3>{entry.date_created}</h3>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default DashboardRoute;
