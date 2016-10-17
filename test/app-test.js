var expect = require('chai').expect;
const React = require('react');
const App = require('../app/components/app')
const WeatherDisplay = require('../app/components/WeatherDisplay')
require('locus')//i have required my debugger

import {shallow, mount, render} from 'enzyme'


describe('app.jsx should render the WeatherDisplay', function () {
  it('should render the application', function () {
    //define which wrapper i want to use
      const wrapper = shallow (<App/>)
      expect(wrapper.contains(<WeatherDisplay/>)).to.be.true
      // expect(wrapper.props()).to.deep.equal({initialCount: 0})
    //expect the wrapper to be there
  })

})
