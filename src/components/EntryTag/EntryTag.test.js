import React from 'react';
import ReactDOM from 'react-dom';
import EntryTag from './EntryTag'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EntryTag />, div);
  ReactDOM.unmountComponentAtNode(div);
});