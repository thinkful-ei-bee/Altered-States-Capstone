import React from 'react';
import ReactDOM from 'react-dom';
import CloudinaryWidget from './CloudinaryWidget'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CloudinaryWidget />, div);
  ReactDOM.unmountComponentAtNode(div);
});