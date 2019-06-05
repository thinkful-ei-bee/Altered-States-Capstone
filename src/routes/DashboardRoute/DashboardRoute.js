import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./DashboardRoute.css";


class DashboardRoute extends Component {

 

  render() {
    return (
      <div>
        Hello World

        <Link to="/new" className="new-entry-button">
            New Entry
        </Link>
      </div>
    );
  }
}

export default DashboardRoute;
