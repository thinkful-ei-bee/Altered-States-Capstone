import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Sector, Cell } from 'recharts'
import "./DashboardRoute.css";


class DashboardRoute extends Component {

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;


    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);
    
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    const pieData = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];


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

    	<PieChart width={400} height={200} onMouseEnter={this.onPieEnter}>
        <Pie
          data={pieData} 
          cx={300} 
          cy={200} 
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80} 
          fill="#8884d8"
          dataKey='value'
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>

        <div className='mood-avg'>

        </div>
        

        <Link to="/new" className="new-entry-button">
            New Entry
        </Link>
      </div>
    );
  }
}

export default DashboardRoute;
