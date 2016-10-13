const React = require('react')
const ReactDOM = require('react-dom')
const SubmitButton = require('./SubmitButton')
const UserInputField = require('./UserInputField')

const STATES = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI',
  'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'ny', 'NC', 'ND', 'OH', 'OK', 'OR',
  'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

class LocationInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      state: '',
      zip: ''
    };
  }
  updateState(e) {
    let {placeholder, value} = e.target;
    placeholder = placeholder.toLowerCase();
    value = value.toLowerCase();
    this.setState({[placeholder]: value});
  }
  submitLocation(e) {
    e.preventDefault();
    console.log(this.checkValidInput())
    if(this.checkValidInput()){
      this.props.getLocation(this.state);
    }else{
      this.props.invalidInput();
    };
  }
  checkValidInput() {
    //check city
    // var cityValid = true;
    // var stateValid = false;

    var zipValid = false;
    // if (this.state.city.match(/^\d+$/)) {
    //   cityValid = true;
    // } else {
    //   cityValid = false
    // }
    // //check state
    // if (STATES.includes(this.state.state)){
    //   stateValid = true
    // }else {
    //   stateValid = false;
    // }
    //check zip
    if(this.state.zip.length === 5 && !(this.state.city.match(/^\d+$/))) {
      zipValid = true;
    }
    // return (cityValid && stateValid && zipValid)
    return zipValid;
  }
  render() {
    return (
      <div id='input-fields'>
        <UserInputField inputFieldId="city" text="City" value={this.state.city}  handleChange={this.updateState.bind(this)}/>

        <UserInputField inputFieldId="state" text="State" value={this.state.state} handleChange={this.updateState.bind(this)}/>

        <span> OR </span>

        <UserInputField inputFieldId="zip" text="Zip" value={this.state.zip} handleChange={this.updateState.bind(this)}/>

        <input type='submit' onClick={ (e) => this.submitLocation(e)} />

      </div>
    )
  }
}

module.exports = LocationInput
