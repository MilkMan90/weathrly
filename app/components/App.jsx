require('jquery')
const React = require('react')
const ReactDOM = require('react-dom')
const LikesCounter = require('./LikesCounter')
const SubmitButton = require('./SubmitButton')
const UserInputField = require('./UserInputField')
const LocationInput = require('./LocationInput')
const WeatherDisplay = require('./WeatherDisplay')


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
      zip: '',
      data: '',
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
      switch(apiType){
        case 'ip':
          this.callipAPI()
          break;
        case 'zip':
          console.log('suh dude')
          this.callZipAPI()
          break;
        case 'citystate':
          this.callcityAPI()
          break;
      }
    }
    );
  }
  callipAPI (){
    var url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/autoip.json'
    $.get(url, function(data) {
      console.log(data)
      this.setState({
        data:data,
        zip:data.current_observation.display_location.zip
      },() =>{this.saveLocation()})
    }.bind(this));
  }
  callZipAPI() {
    var url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/' + this.state.zip + '.json'
    console.log(url)
    $.get(url, function(data) {
      console.log(data)
      this.setState({
        data:data,
      },() =>{this.saveLocation()})
      console.log(data);
    }.bind(this));
  }
  callCityAPI() {
    var url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/autoip.json'
    $.get(url, function(data) {
      console.log(data)
      this.setState({
        data:data,
        zip:data.current_observation.display_location.zip
      },() =>{this.saveLocation()})
    }.bind(this));
  }
  invalidInput() {
    this.setState({
      invalidInput: true
    })
  }
  saveLocation () {
    var storedLocation = {
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      apiType: 'zip'
    }
    localStorage.setItem('savedLocation', JSON.stringify(storedLocation))
  }
  retrieveLocation () {
    return JSON.parse(localStorage.getItem('savedLocation'))
  }
  componentDidMount () {
    let retrievedLocation = this.retrieveLocation();
    if(retrievedLocation!= null){
      this.setLocation(retrievedLocation)
    }
  }
  render () {
    let errorMessage;
    let invalidInputError;
    let weatherDisplay;
    let weatherStyle;
    // if(true) {
    //   errorMessage = (<div>WOOT</div>)
    // }
    if (this.state.invalidInput === true) {
      invalidInputError = (<div>Please Enter a Valid Zip-code</div>)
    } else {
      invalidInputError = ''
    }

    if (this.state.data){
      weatherDisplay = (<WeatherDisplay weather={this.state.data}/>)
    } else {
      weatherDisplay = '';
    }

    return (
      <div className='container' className={weatherStyle}>
        <h1>Its Weather Time</h1>
        <h3>Enter a Location</h3>
        <LocationInput getLocation={this.setLocation.bind(this)} invalidInput={this.invalidInput.bind(this)}/>
        <input className='button' type='submit' value='Get Current Location' onClick={()=>this.setLocation({apiType:'ip'})}/>
        {invalidInputError}
        {errorMessage}
        {weatherDisplay}
      </div>
    )
  }
}

ReactDOM.render( <App url='http://api.wunderground.com/api/881631f063e09bd3/'/>, document.getElementById('application'))
