import React from 'react';
import ReactDOM from 'react-dom';
import EntryCharts from './EntryCharts'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EntryCharts />, div);
  ReactDOM.unmountComponentAtNode(div);
});