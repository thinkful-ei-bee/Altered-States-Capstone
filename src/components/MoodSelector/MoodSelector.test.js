import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import MoodSelector from './moodSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <MoodSelector />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});