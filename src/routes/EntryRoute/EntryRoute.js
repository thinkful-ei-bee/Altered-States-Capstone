import React, { Component } from "react";
// import { Radar, RadarChart, PolarGrid,
//   PolarAngleAxis, ResponsiveContainer } from 'recharts'
import BackButton from '../../components/Button/Back-button'
import "./EntryRoute.css";
import EntryService from "../../services/entry-service";
// import EntryTag from '../../components/EntryTag/EntryTag'

import EntryCharts from '../../components/EntryCharts/EntryCharts';


class EntryRoute extends Component {

  constructor(props) {
    super(props)
   
    this.state = {
      id: null,
      user_id: null,
      date_created: null,
      face_url: '',
      happiness: 0,
      face_anger: 0,
      face_contempt: 0,
      face_disgust: 0,
      face_fear: 0,
      face_happiness: 0,
      face_neutral: 0,
      face_sadness: 0,
      face_surprise: 0,
      tone_analytical: 0,
      tone_anger: 0,
      tone_confident: 0,
      tone_fear: 0,
      tone_joy: 0,
      tone_sadness: 0,
      tone_tentative: 0,
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params

    EntryService.getEntryById(id)
      .then(res => {
        this.setState({...res})
      })
  }

  // generateToneData() {
  //   const target = this.state

  //   let data = []

  //   for (let key in target) {
  //     if (key.split('_')[0] === 'tone') {
  //       let keyWord = key.split('_')[1]
  //       data.push({
  //         name: keyWord,
  //         amount: target[key] + 10
  //       })
  //     }
  //   }
    
  //   return data

  // }

  // generateEmotionData() {
  //   const target = this.state

  //   let data = []

  //   for (let key in target) {
  //     if (key.split('_')[0] === 'face' && key.split('_')[1] !== 'url') {
  //       let keyWord = key.split('_')[1]

  //       data.push({
  //         name: keyWord,
  //         amount: target[key] + 10
  //       })
  //     }
  //   }
  //   return data
  // }



  render() {

    // const toneData = this.generateToneData()

    // const faceData = this.generateEmotionData()

    // const isMobile = window.innerWidth < 760;
    // const radius = isMobile ? 45 : 80;

    return (
      <div>
        <BackButton/>

        <EntryCharts entry={this.state} />
        {/* <div className='radar-charts-entryPage'>
          <div className='entry-label'><EntryTag date={this.state.date_created} /></div>
          <h3 className='chart-title-tone'>Written Analysis</h3>
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
        </div> */}
        <img src={this.state.face_url} alt='selfie'/>
        <p>{this.state.text}</p>

      </div>
    );
  }
}

export default EntryRoute;
