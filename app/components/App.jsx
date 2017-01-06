require('jquery')
const React = require('react')
const ReactDOM = require('react-dom')
const UserInputField = require('./UserInputField')
const LocationInput = require('./LocationInput')
const WeatherDisplay = require('./WeatherDisplay')
const $ = require('jquery')

import weatherMeLogo from '../images/weatherMeLogo.svg'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      city: '',
      state: '',
      zip: '',
      data: '',
      tempDataUponError: '',
      invalidInput: false
    };
  }
  setLocation({city, state, zip, apiType}) {
    this.setState({
      city: city,
      state: state,
      zip: zip,
      invalidInput: false
    }, () => {
        this.getWeatherFromAPI(apiType)
      }
    );
  }
  getWeatherFromAPI(apiType){
    let url
    switch(apiType){
      case 'ip':
        url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/autoip.json'
        break
      case 'zip':
        url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/' + this.state.zip +'.json'
        break
      case 'citystate':
        url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/'+this.state.state+'/'+this.state.city+'.json'
        break
    }
    $.get(url, function(data) {
      this.setState({
        data:data,
      },() => {
        this.saveLocation()
      })
    }.bind(this))
  }
  invalidInput() {
    this.setState({invalidInput: true})
  }
  saveLocation () {
    if(!this.state.invalidInput){
      this.setState({
        zip: this.state.data.current_observation.display_location.zip
      }, ()=>{
        var storedLocation = {
          city: this.state.city,
          state: this.state.state,
          zip: this.state.zip,
          apiType: 'zip'
        }
        localStorage.setItem('savedLocation', JSON.stringify(storedLocation))
      })
    }
  }
  retrieveLocation () {
    return JSON.parse(localStorage.getItem('savedLocation'))
  }
  componentDidMount () {
    let retrievedLocation = this.retrieveLocation()
    if(retrievedLocation!= null){
      this.setLocation(retrievedLocation)
    } else {
      this.getWeatherFromAPI('ip')
    }
  }
  render () {
    let errorExists
    let errorMessage
    let invalidInputError
    let weatherDisplay
    let weatherStyle

    if (this.state.invalidInput === true) {
      invalidInputError = (<div className = 'invalid-input'>Please Enter a Valid City-State or Zip Code</div>)
    } else {
      invalidInputError = ''
    }

    if(this.state.data !== ''){
      if(this.state.data.response.hasOwnProperty('error')){
        errorMessage = <div>{this.state.data.response.error.description}</div>
        errorExists = true
        } else {
          errorMessage=''
          errorExists = false
        }
    }
     if (this.state.data && errorExists === false){
      weatherDisplay = (<WeatherDisplay className='weather' weather={this.state.data}/>)
    } else if(this.state.tempDataUponError && errorExists === true) {
      weatherDisplay = (<WeatherDisplay className='weather' weather={this.state.tempDataUponError}/>)
    }
    console.log(this.state.data);
    return (
      <div className='app'>
          <div className='banner'>
          </div>
          <header>
            <img className='logo' src={weatherMeLogo}/>
            <LocationInput getLocation={this.setLocation.bind(this)} invalidInput={this.invalidInput.bind(this)}/>
            {invalidInputError}
            <input className='button' id='use-current' type='submit' value='Use Current Location' onClick={()=>this.setLocation({apiType:'ip'})}/>
          </header>
          <main>
            {errorMessage}
            {weatherDisplay}
          </main>
      </div>
    )
  }
}

ReactDOM.render( <App url='https://api.wunderground.com/api/881631f063e09bd3/'/>, document.getElementById('application'))

module.exports = App
