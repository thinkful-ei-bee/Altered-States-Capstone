import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, Radar, RadarChart, PolarGrid, Legend,
  PolarAngleAxis, PolarRadiusAxis } from 'recharts'
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
        console.log('getUserEntries:', res)
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
        console.log('key: ', key)
        data.push({
          name: keyWord,
          amount: entries[entries.length - 1][key] + 10
        })
      }
    }
    
    console.log('TONE DATA: ', data)
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

    console.log('Face DATA: ', data)
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
          Happiness: entries[i].happiness
        })
      }
    }

    else if (entries.length < 5) {
      for (let i = 0; i < entries.length; i++) {
        data.push({
          name: entries[i].date_created,
          Happiness: entries[i].happiness
        })
      }
    }

    return data
  }


  render() {

    const toneData = this.generateToneData()

    const faceData = this.generateEmotionData()

    const happinessData = this.generateHappinessData()

    const toPercent = (decimal, fixed = 0) => {
      return `${(decimal * 100).toFixed(fixed)}%`;
    };

    const getPercent = (value, total) => {
	    const ratio = total > 0 ? value / total : 0;
      return toPercent(ratio, 2);
    };

    const renderTooltipContent = (o) => {
      const { payload, label } = o;
      const total = payload.reduce((result, entry) => (result + entry.value), 0);

      return (
        <div className="customized-tooltip-content">
          <p className="total">{`${label} (Total: ${total})`}</p>
          <ul className="list">
            {
              payload.map((entry, index) => (
                <li key={`item-${index}`} style={{color: entry.color}}>
                  {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
                </li>
              ))
            }
          </ul>
        </div>
      );
    };  
    return (
      <div>
        <div className='tone-table'>
          <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={toneData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
   
            <Radar name="ToneRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
        </div>

        <div className='face-table'>
          <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={faceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            
            <Radar name="FaceRadar" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
          </RadarChart>
        </div>

        <div className='happiness-table'>
          <LineChart width={300} height={100} data={happinessData}>
            <Line type='monotone' dataKey='Happiness' stroke='#8884d8' strokeWidth={2} />
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
