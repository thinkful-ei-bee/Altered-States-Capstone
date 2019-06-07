import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
    }
  }

  generateToneData() {
    const { entries } = this.state

    let data = []

    // No entries
    if (entries.length === 0) {
      return
    }

    // Shows up to 5 entries (most recent)
    if (entries.length >= 5) {
      for (let i = entries.length - 5; i < entries.length; i++) {
        data.push({
          name: entries[i].date,
          Joy: entries[i].Joy,
          Fear: entries[i].Fear,
          Sadness: entries[i].Sadness,
          Anger: entries[i].Sadness,
          Analytical: entries[i].Analytical,
          Confident: entries[i].Confident,
          Tentative: entries[i].Tentative
        })
      }
    }

    else if (entries.length < 5) {
      for (let i = 0; i < entries.length; i++) {
        data.push({
          name: entries[i].date,
          Joy: entries[i].Joy,
          Fear: entries[i].Fear,
          Sadness: entries[i].Sadness,
          Anger: entries[i].Sadness,
          Analytical: entries[i].Analytical,
          Confident: entries[i].Confident,
          Tentative: entries[i].Tentative
        })
      }
    }

    return data

  }

  generateEmotionData() {
    const { entries } = this.state

    // Return example data if the user has no entries
    if (entries.length === 0) {
      return [{
        time: 'Example',
        Anger: 3,
        Contempt: 3,
        Disgust: 3,
        Fear: 3,
        Happiness: 3,
        Neutral: 3,
        Sadness: 3,
        Surprise: 3,
      },
      {
      time: 'Example',
      Anger: 2,
      Contempt: 5,
      Disgust: 3,
      Fear: 3,
      Happiness: 3,
      Neutral: 1,
      Sadness: 3,
      Surprise: 0,
      }]
    }

    let data = []

    // Shows up to 5 entries (most recent)
    if (entries.length >= 5) {
      for (let i = entries.length - 5; i < entries.length; i++) {
        data.push({
          time: entries[i].date_created,
          Anger: entries[i].face_anger,
          Contempt: entries[i].face_contempt,
          Disgust: entries[i].face_disgust,
          Fear: entries[i].face_fear,
          Happiness: entries[i].face_happiness,
          Neutral: entries[i].face_neutral,
          Sadness: entries[i].face_sadness,
          Surprise: entries[i].face_surprise
        })
      }
    }

    else if (entries.length < 5) {
      for (let i = 0; i < entries.length; i++) {
        data.push({
          time: entries[i].date_created,
          Anger: entries[i].face_anger,
          Contempt: entries[i].face_contempt,
          Disgust: entries[i].face_disgust,
          Fear: entries[i].face_fear,
          Happiness: entries[i].face_happiness,
          Neutral: entries[i].face_neutral,
          Sadness: entries[i].face_sadness,
          Surprise: entries[i].face_surprise
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

    const data = this.generateToneData()

    const faceData = this.generateEmotionData()

    const happinessData = [
      {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
      {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
      {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
      {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
      {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
      {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

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
          <LineChart width={300} height={200} data={data}
            margin={{top: 5, right: 50, left: 0, bottom: 5,}}>
            <Line type="monotone" dataKey="Joy" stroke="#8884d8" />
            <Line type="monotone" dataKey="Fear" stroke="#8884d8" />
            <Line type='monotone' dataKey='Sadness' stroke='#82ca9d' />
            <Line type='monotone' dataKey='Anger' stroke='#82ca9d' />
            <Line type='monotone' dataKey='Analytical' stroke='#82ca9d' />
            <Line type='monotone' dataKey='Confident' stroke='#82ca9d' />
            <Line type='monotone' dataKey='Tentative' stroke='#82ca9d' />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[1, 5]} />
          </LineChart>
        </div>

        <div className='face-table'>
          <AreaChart width={300} height={200} data={faceData} stackOffset="expand"
                margin={{top: 10, right: 50, left: 0, bottom: 0}} >
            <XAxis dataKey="time"/>
            <YAxis tickFormatter={toPercent}/>
            <Tooltip content={renderTooltipContent}/>
            <Area type='monotone' dataKey='Anger' stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='Contempt' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            <Area type='monotone' dataKey='Disgust' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='Fear' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='Happiness' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='Neutral' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='Sadness' stackId="1" stroke='#ffc658' fill='#ffc658' />
            <Area type='monotone' dataKey='Surprise' stackId="1" stroke='#ffc658' fill='#ffc658' />
          </AreaChart>
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
                <h3>{entry.date}</h3>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default DashboardRoute;
