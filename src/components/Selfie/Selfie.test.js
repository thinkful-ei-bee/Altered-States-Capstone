import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Selfie from './Selfie';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Selfie />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});