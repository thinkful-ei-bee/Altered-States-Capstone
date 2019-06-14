import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import TrendGraph from './TrendGraph';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <TrendGraph />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});