import React, { Component } from "react";
import { LineChart, Line, 
     YAxis, XAxis, ResponsiveContainer } from 'recharts'
import EntryService from "../../services/entry-service";
import TrendGraph from '../../components/TrendGraph/TrendGraph'

export default class TrendRoute extends Component {
    constructor(props) {
        super(props)
        this.state = {
          entries: [],
          
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




      generateData() {
        const { entries } = this.state
        let data = []
        console.log(entries)
        if (!entries) return
        
        if (entries.length >= 5) {
            for (let i = entries.length - 5; i < entries.length; i++) {
                data.push({
                    name: entries[i].date_created,
                    happiness:entries[i].happiness,
                    tone_joy: entries[i].tone_joy / 10,
                    tone_analytical:entries[i].tone_analytical / 10,
                    tone_confident:entries[i].tone_confident / 10,
                    tone_fear:entries[i].tone_fear / 10,
                    tone_sadness:entries[i].tone_sadness / 10,
                    tone_tentative:entries[i].tone_tentative / 10,
                    face_anger:entries[i].face_anger/10,
                    face_contempt:entries[i].face_contempt/10,
                    face_disgust:entries[i].face_disgust/10,
                    face_fear:entries[i].face_fear/10,
                    face_happiness:entries[i].face_happiness/10,
                    face_neutral:entries[i].face_neutral/10,
                    face_sadness:entries[i].face_sadness/10,
                    face_surprise:entries[i].face_surprise/10,
                })
                
             
           
        }
        console.log(data)
        
        }
    
        else if (entries.length < 5) {
          for (let i = 0; i < entries.length; i++) {
            data.push({
                name: entries[i].date_created,
                happiness:entries[i].happiness,
                tone_joy: entries[i].tone_joy / 10,
                tone_analytical:entries[i].tone_analytical / 10,
                tone_confident:entries[i].tone_confident / 10,
                tone_fear:entries[i].tone_fear / 10,
                tone_sadness:entries[i].tone_sadness / 10,
                tone_tentative:entries[i].tone_tentative / 10,
                face_anger:entries[i].face_anger/10,
                face_contempt:entries[i].face_contempt/10,
                face_disgust:entries[i].face_disgust/10,
                face_fear:entries[i].face_fear/10,
                face_happiness:entries[i].face_happiness/10,
                face_neutral:entries[i].face_neutral/10,
                face_sadness:entries[i].face_sadness/10,
                face_surprise:entries[i].face_surprise/10,
            })
            }
        }
        return data     
        
      }


    render(){
        
        const data = this.generateData()
        return(
            <div>

        <div className='happiness-table'>
                
          <TrendGraph className='happiness' data={data} dataKey='happiness' />

        </div>
        
    <div className='tone-tables'>
        <TrendGraph className='tone-joy' data={data} dataKey='tone_joy' />
        <TrendGraph className='tone-confident' data={data} dataKey='tone_confident' />
        <TrendGraph className='tone-analytical' data={data} dataKey='tone_analytical' />
        <TrendGraph className='tone-tentative' data={data} dataKey='tone_tentative' />
        <TrendGraph className='tone-fear' data={data} dataKey='tone_fear' />
        <TrendGraph className='tone-sadness' data={data} dataKey='tone_sadness' />
    </div>
    <div className='face-tables'>
        <TrendGraph className='face-anger' data={data} dataKey='face_anger' />
        <TrendGraph className='face-contempt' data={data} dataKey='face_contempt' />
        <TrendGraph className='face-disgust' data={data} dataKey='face_disgust' />
        <TrendGraph className='face-fear' data={data} dataKey='face_fear' />
        <TrendGraph className='face-sadness' data={data} dataKey='face_sadness' />
        <TrendGraph className='face-neutral' data={data} dataKey='face_neutral' />
        <TrendGraph className='face-surprise' data={data} dataKey='face_surprise' />
        <TrendGraph className='face-happiness' data={data} dataKey='face_happiness' />

    </div>


    </div>
        )
    }
}