import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./DashboardRoute.css";
import EntryService from "../../services/entry-service";
import EntryTag from '../../components/EntryTag/EntryTag'
import EntryCharts from "../../components/EntryCharts/EntryCharts";

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
        this.setState({entries: res.reverse()}, () => {
          if (this.state.entries.length === 0) {
            this.setState({ newUser: true })
            return
          }
        })
      })
  }
 
  handleDisplayChange(id) {
    this.setState({display: id})
  }

  generateEntryLabel(entry) {
    return <EntryTag date={entry.date_created} />
  }

  

  renderEntryList() {
    const { entries } = this.state
    if (entries.length === 0) {
      return (
        <div className='chart-instructions'>
          <p>Click "Add New Entry" above to create an Entry and see mood data.</p>
        </div>
      )
    }
    return (
    <ul>
      {entries.map(entry => this.renderEntry(entry))}
    </ul>
    )
  }


  renderEntry(entry) {

    let selfieExists = false;
    
    for (let [key, val] of Object.entries(entry)) {
      if (key.split('_')[0] === 'face' && val > 0) {
        selfieExists = true;
      }
    }
    return (
    
      <li key={entry.id} className='entryList-entry'>
        <Link to={`/entry/${entry.id}/dash`} >
          <EntryCharts entry={entry} label={this.generateEntryLabel(entry)} selfie={selfieExists}/>
        </Link>
      </li>
      
    )
  }


  render() {
    return (
      <div>

        <div className='entry-charts-dashboard-container'>
          <Link to="/new" className="new-entry-button">
              <h3>+ Add New Entry</h3>
          </Link>
          
          {this.renderEntryList()}
          
        </div>
      </div>
    );
  }
}

export default DashboardRoute;
