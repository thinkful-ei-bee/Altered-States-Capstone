import React from 'react';
import JournalInfo from './JournalInfo';
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

describe('DashboardRoute', () => {

  it('renders the complete page', () => {
    const wrapper = shallow(<JournalInfo />);
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})