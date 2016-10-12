const React = require('react')
const ReactDOM = require('react-dom')
const SubmitButton = require('./SubmitButton')
const UserInputField = require('./UserInputField')

class LocationInput extends React.Component {
  constructor(props){
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
    this.setState({ [placeholder]: value});
  }
  submitLocation(e){
    e.preventDefault();
    this.props.getLocation(this.state);
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
