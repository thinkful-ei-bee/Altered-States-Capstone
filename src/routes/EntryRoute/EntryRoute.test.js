import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import EntryRoute from './EntryRoute';
import toJson from 'enzyme-to-json'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('DashboardRoute', () => {

  it('renders the complete page', () => {
    const wrapper = shallow(<EntryRoute />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})