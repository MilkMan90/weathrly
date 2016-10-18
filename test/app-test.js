var expect = require('chai').expect;
const React = require('react');
const App = require('../app/components/app')
const LocationInput = require('../app/components/LocationInput')
const UserInputField = require('../app/components/UserInputField')
const $ = require('jquery')
require('locus')//i have required my debugger

import {shallow, mount, render} from 'enzyme'

describe('input and state tests', function () {
  it('throwing denver in city input field should render the correct input', function () {
    //define which wrapper i want to use
      const wrapper = mount (<LocationInput userInputFieldId='city'/>)
      var field = wrapper.find('#city').simulate('change',{target: {value: 'denver', placeholder:'city'} })
      expect(wrapper.state('city')).to.equal('denver')
  })

  it('throwing zip code input field should render the correct input state', function () {
    //define which wrapper i want to use
      const wrapper = mount (<LocationInput userInputFieldId='zip'/>)
      var field = wrapper.find('#zip').simulate('change',{target: {value: '80220', placeholder:'zip'} })
      expect(wrapper.state('zip')).to.equal('80220')
  })

  it('throwing state in city input field should render the correct input', function () {
    //define which wrapper i want to use
      const wrapper = mount (<LocationInput userInputFieldId='state'/>)
      var field = wrapper.find('#state').simulate('change',{target: {value: 'co', placeholder:'state'} })
      expect(wrapper.state('state')).to.equal('co')
  })
})

describe('input > app tests', function () {
  it('when updating zip code, state over overall app should be equal to the zip code enterd', function () {

    const wrapper = mount (<App url='https://api.wunderground.com/api/881631f063e09bd3/'/>)

    wrapper.find('#zip').simulate('change',{target: {value: '80220', placeholder:'zip'} })
    wrapper.find('.submit-button').simulate('click')
    expect(wrapper.state('zip')).to.equal('80220')
  })

  it('when updating city and state, state of overall app should be equal to the data entered', function () {

    const wrapper = mount (<App url='https://api.wunderground.com/api/881631f063e09bd3/'/>)

    wrapper.find('#city').simulate('change',{target: {value: 'denver', placeholder:'city'} })
    wrapper.find('#state').simulate('change',{target: {value: 'co', placeholder:'state'} })
    wrapper.find('.submit-button').simulate('click')
    expect(wrapper.state('city')).to.equal('denver')
    expect(wrapper.state('state')).to.equal('co')
  })

  it('when entering zip code, app state should be equal zip code and then a request should be sent to the api', function() {

    const wrapper = mount (<App url='https://api.wunderground.com/api/881631f063e09bd3/'/>)

    wrapper.find('#zip').simulate('change',{target: {value: '80220', placeholder:'zip'} })
    wrapper.find('.submit-button').simulate('click')

    wrapper.update();
    console.log('test')


    console.log(wrapper.state())

  })
})
