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
  setLocation({city, state, zip}) {
    this.setState({
      city: city,
      state: state,
      zip: zip,
      invalidInput: false
    }, () => {this.callZipAPI()});
  }
  callZipAPI() {
    console.log(this.props.url)
    var url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/' + this.state.zip + '.json'
    console.log(url)
    $.get(url, function(data) {
      this.setState({data:data})
      console.log(data);
    }.bind(this));
  }
  callCityAPI() {

  }
  invalidInput() {
    this.setState({
      invalidInput: true
    })
  }
  render () {
    let errorMessage;
    let invalidInputError;
    let weatherDisplay;
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
      <div className='container'>
        <h1>Its Weather Time</h1>
        <h3>Enter Your Location</h3>
        <LocationInput getLocation={this.setLocation.bind(this)} invalidInput={this.invalidInput.bind(this)}/>
        {invalidInputError}
        {errorMessage}
        {weatherDisplay}
      </div>
    )
  }
}

ReactDOM.render( <App url='http://api.wunderground.com/api/881631f063e09bd3/'/>, document.getElementById('application'))
