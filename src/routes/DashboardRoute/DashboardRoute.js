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
      // display: null
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
          // this.setState({display: this.state.entries[-1]})
        })
      })
  }
 
  handleDisplayChange(id) {
    this.setState({display: id})
  }

  // generateEntryLabel() {
  //   const { entries, display } = this.state
  //   if (entries.length === 0) return <p>No Entries</p>
  //   const selected = entries.filter(entry => entry.id === display)
  //   const target = selected.length > 0 ? selected[0] : entries[entries.length - 1]
  //   return <Link to={`/entry/${target.id}`} ><EntryTag date={target.date_created} /></Link>
  // }

  generateEntryLabel(entry) {
    return <Link to={`/entry/${entry.id}`} ><EntryTag date={entry.date_created} /></Link>
  }

  // renderEntryCharts() {
  //   const { entries, display } = this.state
  //   if (entries.length === 0) {
  //     // await this.setState({ newUser: true })
  //     return (
  //       <div className='chart-instructions'>
  //         <p>Here you will see data related to your mood. Try clicking "Add New Entry" below to see new data.</p>
  //       </div>
  //     )
  //   }
  //   const selected = entries.filter(entry => entry.id === display)
  //   const target = selected.length > 0 ? selected[0] : entries[entries.length - 1]
  //   return <EntryCharts entry={target} label={this.generateEntryLabel()}/>;
  // }

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
    return (
      <li key={entry.id} className='entryList-entry'>
        <EntryCharts entry={entry} label={this.generateEntryLabel(entry)}/>
      </li>
    )
  }


  render() {
    let { newUser } = this.state
    console.log(newUser)

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

        {/* <ul className='past-entries'>
          <li>
            <Link to="/new" className="new-entry-button">
                <h3>+ Add New Entry</h3>
            </Link>
          </li>
          {!this.state.entries.length && 
            <li>(... no entries yet!)</li>
          }
          {this.state.entries.length > 0 && this.state.entries.map(entry => {
            return (
              <li key={entry.id}>
                <div onClick={() => this.handleDisplayChange(entry.id)}>
                  <EntryTag date={entry.date_created} happiness={entry.happiness}/>
                </div>
              </li>
            )
          })}
        </ul> */}
      </div>
    );
  }
}

export default DashboardRoute;
