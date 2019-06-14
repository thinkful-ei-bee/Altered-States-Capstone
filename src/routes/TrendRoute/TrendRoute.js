import React, { Component } from "react";
import dateFormat from 'dateformat';
import EntryService from "../../services/entry-service";
import TrendGraph from '../../components/TrendGraph/TrendGraph'
import './TrendRoute.css'

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




      generateData(length) {
        const { entries } = this.state
        let data = []
       

        if (!entries) return
        
        if (entries.length >= length) {
            for (let i = entries.length - length; i < entries.length; i++) {
              
              
                data.push({
                    name: dateFormat(entries[i].date_created, 'mm/dd'),
                    happiness:entries[i].happiness / 10,
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
    
        else if (entries.length < length) {
          for (let i = 0; i < entries.length; i++) {
            data.push({
                name: dateFormat(entries[i].date_created, 'mm/dd'),
                happiness:entries[i].happiness / 10,
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
        
        const isMobile = window.innerWidth < 760;
        const length = isMobile? 10 : 14;
        
        const data = this.generateData(length)
        

        return(
            <div className='trend-graphs'>
        <h2>Trends</h2>
        <div className='happiness-table'>
                
          <TrendGraph className='happiness' data={data} dataKey='happiness' />

        </div>
        
    <div className='tone-tables'>
    <h3>Writing trends</h3>
        <TrendGraph className='joy' data={data} dataKey='tone_joy' />
        <TrendGraph className='confident' data={data} dataKey='tone_confident' />
        <TrendGraph className='analytical' data={data} dataKey='tone_analytical' />
        <TrendGraph className='tentative' data={data} dataKey='tone_tentative' />
        <TrendGraph className='fear' data={data} dataKey='tone_fear' />
        <TrendGraph className='sadness' data={data} dataKey='tone_sadness' />
    </div>
    <div className='face-tables'>
        <h3>Selfie trends</h3>
        <TrendGraph className='anger' data={data} dataKey='face_anger' />
        <TrendGraph className='contempt' data={data} dataKey='face_contempt' />
        <TrendGraph className='disgust' data={data} dataKey='face_disgust' />
        <TrendGraph className='fear' data={data} dataKey='face_fear' />
        <TrendGraph className='sadness' data={data} dataKey='face_sadness' />
        <TrendGraph className='neutral' data={data} dataKey='face_neutral' />
        <TrendGraph className='surprise' data={data} dataKey='face_surprise' />
        <TrendGraph className='happiness' data={data} dataKey='face_happiness' />

    </div>


    </div>
        )
    }
}