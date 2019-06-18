import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./DashboardRoute.css";
import EntryService from "../../services/entry-service";
import EntryTag from '../../components/EntryTag/EntryTag'
import EntryCharts from "../../components/EntryCharts/EntryCharts";
import happy from '../../images/happy.png'


class DashboardRoute extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: false,
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


  // generateEntryLabel(entry) {
  //   return <Link to={`/entry/${entry.id}`} ><EntryTag date={entry.date_created} /></Link>
  // }

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
    const selfie = entry.face_url ? true : false;
    return (
    
      <li key={entry.id} className='entryList-entry'>
        <Link to={`/entry/${entry.id}`} >
          <EntryCharts entry={entry} label={this.generateEntryLabel(entry)} selfie={selfie}/>
        </Link>
      </li>
      
    )
  }


  render() {
    let { newUser } = this.state

    return (
      <div>

        {newUser && 
          <div className='tutorial-container'>
            <img src={happy} alt='happy' />
            <h2>Welcome to miMood!</h2>
            <h3>Track your mood with the help of AI!</h3>
            <p>Machine learning algorithms analyze your entries for emotional cues, providing insight into how you're feeling.</p>
            <p>Add an entry to see emotional analysis.</p>
            <button onClick={() => this.setState({ newUser: false })}>GET STARTED</button>
          </div>
        }

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
