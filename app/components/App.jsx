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
        this.getWeatherFromAPI(apiType);
      }
    );
  }

  getWeatherFromAPI(apiType){
    let url;
    switch(apiType){
      case 'ip':
        url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/autoip.json'
        break;
      case 'zip':
        url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/' + this.state.zip +'.json'
        break;
      case 'citystate':
        url = this.props.url + 'alerts/conditions/forecast10day/hourly10day/q/'+this.state.state+'/'+this.state.city+'.json'
        break;
    }
    $.get(url, function(data) {
      this.setState({
        data:data,
      },() =>{this.saveLocation()})
    }.bind(this));
  }
  invalidInput() {
    this.setState({
      invalidInput: true
    })
  }
  saveLocation () {
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
    let errorExists;
    let errorMessage;
    let invalidInputError;
    let weatherDisplay;
    let weatherStyle;

    if (this.state.invalidInput === true) {
      invalidInputError = (<div className = 'invalid-input'>Please Enter a Valid Zip-code</div>)
    } else {
      invalidInputError = ''
    }

    if(this.state.data !== ''){
      if(this.state.data.response.hasOwnProperty('error')){
        console.log(this.state.data.response.error.description)
         errorMessage = <div>{this.state.data.response.error.description}</div>
        errorExists = true;
        } else {
          errorMessage=''
          errorExists = false;
        }
    }

     if (this.state.data && errorExists===false){
      weatherDisplay = (<WeatherDisplay className='weather' weather={this.state.data}/>)
    } else {
      weatherDisplay = '';
    }

    return (
      <div className='app'>
          <div className='banner'>
          </div>
          <header>
            <img className='logo' src='/images/weatherMeLogo.svg'/>
            <LocationInput getLocation={this.setLocation.bind(this)} invalidInput={this.invalidInput.bind(this)}/>
            {invalidInputError}
            <input className='button' type='submit' value='Use Current Location' onClick={()=>this.setLocation({apiType:'ip'})}/>
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
