const React = require('react')
const ReactDOM = require('react-dom')
const LikesCounter = require('./LikesCounter')
const SubmitButton = require('./SubmitButton')
const UserInputField = require('./UserInputField')
const LocationInput = require('./LocationInput')

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city: '',
      state: '',
      zip: '',
      data: ''
    };
    // this.props.hourly = '',
    // this.props.current = '',
  }
  setLocation({city, state, zip}){
    this.setState({
      city: city,
      state: state,
      zip: zip
    });
    //check valid input
    //do api call
  }
  checkValidInput(){
    
  }
  callAPI(){

  }
  render () {
    let errorMessage;
    // if(true) {
    //   errorMessage = (<div>WOOT</div>)
    // }
    return (
      <div>
        <LocationInput getLocation={this.setLocation.bind(this)}/>
        {errorMessage}
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('application'))
