import React from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts'
import './JournalInfo.css'

export default class JournalInfo extends React.Component {
  
  render() {
    const { currentEntry, entryTones } = this.props;

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

    const data = [
      {name: 'Group A', value: 400}, 
      {name: 'Group B', value: 300},
      {name: 'Group C', value: 300}, 
      {name: 'Group D', value: 200}
    ];
    return (
      <section className='journal-feedback'>
        <p>{currentEntry}</p>
        <div className='pie-container'>
            <PieChart width={205} height={205} onMouseEnter={this.onPieEnter}>
                <Pie
                data={data} 
                cx={100} 
                cy={100} 
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80} 
                fill="#8884d8">
                    {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                </Pie>
            </PieChart>
        </div>
      </section>


    )
  }
}