import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart, Area } from 'recharts'
import "./DashboardRoute.css";

class DashboardRoute extends Component {

  render() {

    const data = [
      {name: '05/17', joy: 3.4, sadness: 4.4},
      {name: '05/18', joy: 1.4, sadness: 5.0},
      {name: '05/19', joy: 3.2, sadness: 2.1},
      {name: '05/20', joy: 4.3, sadness: 1.1},
      {name: '05/21', joy: 3.4, sadness: 1.6},
    ];

    const faceData = [
      {month: '2015.01', a: 4000, b: 2400, c: 2400},
      {month: '2015.02', a: 3000, b: 1398, c: 2210},
      {month: '2015.03', a: 2000, b: 9800, c: 2290},
      {month: '2015.04', a: 2780, b: 3908, c: 2000},
      {month: '2015.05', a: 1890, b: 4800, c: 2181},
      {month: '2015.06', a: 2390, b: 3800, c: 2500},
      {month: '2015.07', a: 3490, b: 4300, c: 2100},
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
            <Line type="monotone" dataKey="joy" stroke="#8884d8" />
            <Line type='monotone' dataKey='sadness' stroke='#82ca9d' />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[1, 5]} />
          </LineChart>
        </div>

        <div className='face-table'>
          <AreaChart width={300} height={200} data={faceData} stackOffset="expand"
                margin={{top: 10, right: 50, left: 0, bottom: 0}} >
            <XAxis dataKey="month"/>
            <YAxis tickFormatter={toPercent}/>
            <Tooltip content={renderTooltipContent}/>
            <Area type='monotone' dataKey='a' stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='b' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            <Area type='monotone' dataKey='c' stackId="1" stroke='#ffc658' fill='#ffc658' />
          </AreaChart>
        </div>

        <Link to="/new" className="new-entry-button">
            New Entry
        </Link>
      </div>
    );
  }
}

export default DashboardRoute;
