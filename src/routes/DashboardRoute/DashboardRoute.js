import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts'
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

        <Link to="/new" className="new-entry-button">
            New Entry
        </Link>
      </div>
    );
  }
}

export default DashboardRoute;
