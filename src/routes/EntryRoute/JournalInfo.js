import React from 'react'
import {PieChart, Pie,  Cell} from 'recharts'
import './JournalInfo.css'

export default class JournalInfo extends React.Component {

  generateData() {
    const { joy, fear, sadness, 
      anger, analytical, confident, 
      tentative } = this.props;

    const entryTones = { joy, fear, sadness, 
      anger, analytical, confident, 
      tentative }
    if (!entryTones) return

    let data = [];

    for (let key in entryTones) {
      data.push(
        { name: key, value: entryTones[key] }
      )
    }

    return data
  }
  
  render() {
    const { currentEntry } = this.props;

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

    const data = this.generateData()
    console.log('data: ', data)

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
                fill="#8884d8"
                dataKey='value'>
                    {data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                </Pie>
            </PieChart>
        </div>
      </section>


    )
  }
}